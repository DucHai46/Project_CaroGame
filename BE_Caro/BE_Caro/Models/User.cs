using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace BE_Caro.Models
{
    public class User : IdentityUser
    {

        public int Score { get; set; } = 0;
    }
}
