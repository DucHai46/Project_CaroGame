using AutoMapper;
using BE_Caro.DataTransferObjects;
using BE_Caro.JwtFeatures;
using BE_Caro.Models;
using BE_Caro.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace BE_Caro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly IMapper mapper;
        private readonly JwtHandler jwtHandler;


        public AccountController(UserManager<User> userManager, IMapper mapper, JwtHandler jwtHandler)
        {
            this.userManager = userManager;
            this.mapper = mapper;
            this.jwtHandler = jwtHandler;
        }


        [HttpPost("Registration")]
        public async Task<IActionResult> RegisterUserAsync([FromBody] UserRegister registertrationDto)
        {
            if (registertrationDto == null || !ModelState.IsValid)
            {
                return Ok(new RegisterResponse { IsSuccessfulRegistration = false });
            }

            var user = mapper.Map<User>(registertrationDto);

            var result = await userManager.CreateAsync(user, registertrationDto.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                return Ok(new RegisterResponse { Errors = errors, IsSuccessfulRegistration = false });
            }
            return Ok(new RegisterResponse { IsSuccessfulRegistration = true });
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserLogin userAuthentication)
        {
            var user = await userManager.FindByEmailAsync(userAuthentication.Email);
            if (user == null || !await userManager.CheckPasswordAsync(user, userAuthentication.Password))
            {
                return Ok(new LoginResponse { ErrorMessage = "Invalid" });
            }
            var signingCredentials = jwtHandler.GetSigningCredentials();
            var claims = jwtHandler.GetClaim(user);
            var tokenOptions = jwtHandler.JwtSecurityToken(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new LoginResponse { IsAuthSuccessful = true, Token = token });
        }
    }
}
