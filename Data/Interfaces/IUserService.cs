using Atiendeme.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Atiendeme.Data.Interfaces
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        void PasswordRecovery(string Mail, string urlToSend);
        void IfTokenValid(string Token);
        void PasswordRecoveryFinish(string NewPassword, string Token);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }
    
}
