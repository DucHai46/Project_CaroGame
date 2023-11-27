using System.ComponentModel.DataAnnotations;

namespace BE_Caro.DataTransferObjects
{
    public class UserLogin
    {
        [Required(ErrorMessage = "Email is required.")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        public string? Password { get; set; }
    }
}
