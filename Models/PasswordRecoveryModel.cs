using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace express_tickets.Models
{
    public class PasswordRecoveryModel
    {
        [Required]
        public string EmailDestination { get; set; }

        [Required]
        public string UrlToSend { get; set; }
    }

    public class PasswordRecoveryFinishModel
    {
        [Required]
        public string Token { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}
