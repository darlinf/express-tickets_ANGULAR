using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class MailModel
    {
        [Required]
        public string EmailDestination { get; set; }

        [Required]
        public string Body { get; set; }
    }
}