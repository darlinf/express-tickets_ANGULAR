using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Atiendeme.Data;
using Atiendeme.Data.Entities;
using Atiendeme.Data.Interfaces;
using express_tickets.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{


    public class UserService : IUserService
    {

        private readonly AppSettings _appSettings;
        DataContext _context;
        public UserService(IOptions<AppSettings> appSettings, DataContext context)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }

        public User Authenticate(string mail, string password)
        {
            if (string.IsNullOrEmpty(mail) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Users.SingleOrDefault(x => x.Mail == mail);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;//.WithoutPassword();
        }
        public IEnumerable<User> GetAll()
        {
            return _context.Users.WithoutPasswords();
        }

        public User GetById(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            return user.WithoutPassword();
        }

        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.Users.Any(x => x.Mail == user.Mail))
                throw new AppException("Email \"" + user.Mail + "\" is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.Role = Role.User;

            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }

        public void CheckEmail(string Mail){
            var user = _context.Users.FirstOrDefault(x => x.Mail == Mail);
            if(user != null) throw new AppException("El correo esta en uso");
        }

        public void Update(User userParam, string password = null)
        {
            var user = _context.Users.Find(userParam.Id);

            if (user == null)
                throw new AppException("Usuario no encontrado");

            if (userParam.Mail != user.Mail)
            {
                // username has changed so check if the new username is already taken
                if (_context.Users.Any(x => x.Mail == userParam.Mail))
                    throw new AppException("Email " + userParam.Mail + " is already taken");
            }

            // update user properties
            user.FirstName = userParam.FirstName;
            user.LastName = userParam.LastName;
            user.Mail = userParam.Mail;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

        // private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        public void PasswordRecovery(string Mail, string urlToSend)
        {
            var user = _context.Users.FirstOrDefault(x => x.Mail == Mail);
            if (user == null)
            {
                throw new AppException("El correo no es valido");
            }

            string token = GetSha256(Guid.NewGuid().ToString());

            user.Token = token;
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
            SendEmail(user.Mail, token, urlToSend);
        }

        public void IfTokenValid(string Token)
        {
            var user = _context.Users.Where(x => x.Token == Token).FirstOrDefault();
            if (user == null) throw new AppException("El token no es valido");
        }

        public void PasswordRecoveryFinish(string NewPassword, string Token)
        {
            var user = _context.Users.Where(x => x.Token == Token).FirstOrDefault();

            if (user == null) throw new AppException("El token no es valido");

            if (!string.IsNullOrWhiteSpace(NewPassword))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(NewPassword, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Token = null;
                _context.Entry(user).State = EntityState.Modified;
                _context.SaveChanges();
            }
            else
            {
                throw new AppException("La contrase�a no es valida");
            }
        }

        #region HELPERS
        private string GetSha256(string str)
        {
            SHA256 sha256 = SHA256Managed.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = null;
            StringBuilder sb = new StringBuilder();
            stream = sha256.ComputeHash(encoding.GetBytes(str));
            for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
            return sb.ToString();
        }

        private void SendEmail(string EmailDestino, string token, string urlToSend)
        {
            string mailPart1 = "<div class=''><div class='aHl'></div><div id=':146' tabindex='-1'></div><div id=':14h' class='ii gt'><div id=':14i' class='a3s aiL '><div class='adM'> </div><div><div class='adM'> </div><table width='660' align='center' cellpadding='0' cellspacing='0' bgcolor='#f2f2f2'> <tbody><tr> <td colspan='2' bgcolor='#e4e4e4'><img src='https://contents.smsupermalls.com/data/uploads/2020/07/SPI_TICKET_EXPRESS.png' width='212' height='200' class='CToWUd'><br></td> <td width='88' bgcolor='#e4e4e4'> </td> </tr> <tr> <td width='88'> </td> <td style='font-family:Calibri;font-size:11pt;color:#282828;line-height:14pt;padding-top:11pt;padding-right:50pt'> <p>Si desea restablecer la contraseña de su cuenta de Ticket Express, por favor, siga el enlace de más abajo en las próximas 24 horas: </p> <p><a href='";
            string mailPart2 = "' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://my.splashtop.com/reset?reset_password_token%3DVqeyHAL4zGbbUgDPLZaU&source=gmail&ust=1605572058961000&usg=AFQjCNFb1cebyZoZNlkc5zTtJJQEweS0iw'>Click para recuperar contrasena.</a></p> <p>Si no ha solicitado restablecer la contraseña, ignore el mensaje.</p> <p>Gracias.</p> <p>- El equipo de Ticket Express</p> </td> <td> </td> </tr> <tr> <td colspan='3'> </td> </tr> <tr> <td height='6' colspan='3'> <table cellpadding='0' cellspacing='0'> <tbody><tr> <td width='220' height='6' bgcolor='#519a00'></td> <td width='220' height='6' bgcolor='#562a93'></td> <td width='220' height='6' bgcolor='#004aa2'></td> </tr> </tbody></table> </td> </tr> </tbody></table><div class='yj6qo'></div><div class='adL'> </div></div><div class='adL'> </div></div></div><div id=':142' class='ii gt' style='display:none'><div id=':141' class='a3s aiL undefined'></div></div><div class='hi'></div></div>";

            string EmailOrigen = "ticketexpress053@gmail.com";
            string Contrasena = "Darlin2020";
            string url = urlToSend + "/" + token;
            var mailFinalPart = mailPart1 + url + mailPart2;

            MailMessage oMailMessage = new MailMessage(EmailOrigen, EmailDestino, "Recuperacion de contrasena", mailFinalPart);

            oMailMessage.IsBodyHtml = true;

            SmtpClient oSmtpClient = new SmtpClient("smtp.gmail.com");
            oSmtpClient.EnableSsl = true;
            oSmtpClient.UseDefaultCredentials = false;
            oSmtpClient.Port = 587;
            oSmtpClient.Credentials = new System.Net.NetworkCredential(EmailOrigen, Contrasena);

            oSmtpClient.Send(oMailMessage);

            oSmtpClient.Dispose();
        }

        #endregion
    }


}