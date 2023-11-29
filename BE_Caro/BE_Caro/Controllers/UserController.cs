using BE_Caro.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_Caro.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly CaroGameContext caroGameContext;
        
        public UserController(CaroGameContext caroGameContext)
        {
            this.caroGameContext = caroGameContext;
        }


        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = caroGameContext.uses.Select(user => new
            {
                user.UserName,
                user.Score
            }).ToList();

            return Ok(users);
        }

    }
}
