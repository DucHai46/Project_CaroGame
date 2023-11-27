﻿using BE_Caro.DataTransferObjects;
using BE_Caro.Models;
using BE_Caro.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BE_Caro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly AuthService _authService;

        public AccountController(UserManager<User> userManager, AuthService _authService)
        {
            this.userManager = userManager;
            this._authService = _authService;
        }


        [HttpPost("Registration")]
        public IActionResult RegisterUser([FromBody] UserRegister registertrationDto)
        {
            if (registertrationDto == null || !ModelState.IsValid)
            {
                return Ok(new RegisterResponse { IsSuccessfulRegistration = false });
            }
            return Ok(this._authService.RegistrationResponseDto(registertrationDto));
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserLogin userAuthentication)
        {
            var user = await userManager.FindByNameAsync(userAuthentication.Email);
            if (user == null || !await userManager.CheckPasswordAsync(user, userAuthentication.Password))
            {
                return Ok(new LoginResponse { ErrorMessage = "Invalid" });
            }
            return Ok(this._authService.loginResponseAsync(userAuthentication));
        }
    }
}