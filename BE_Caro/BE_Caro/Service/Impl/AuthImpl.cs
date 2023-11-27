using AutoMapper;
using BE_Caro.DataTransferObjects;
using BE_Caro.JwtFeatures;
using BE_Caro.Models;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;

namespace BE_Caro.Service.Impt
{
    public class AuthImpl : AuthService
    {
        private readonly UserManager<User> userManager;
        private readonly IMapper mapper;
        private readonly JwtHandler jwtHandler;

        public AuthImpl(UserManager<User> userManager, IMapper mapper, JwtHandler jwtHandler)
        {
            this.userManager = userManager;
            this.mapper = mapper;
            this.jwtHandler = jwtHandler;
        }

        public async Task<LoginResponse> loginResponseAsync(UserLogin userAuthentication)
        {
            var user = await userManager.FindByNameAsync(userAuthentication.Email);

            var signingCredentials = jwtHandler.GetSigningCredentials();
            var claims = jwtHandler.GetClaim(user);
            var tokenOptions = jwtHandler.JwtSecurityToken(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return new LoginResponse { IsAuthSuccessful = true, Token = token };
        }

        public async Task<RegisterResponse> RegistrationResponseDto(UserRegister userRegistertrationDto)
        {
            var user = mapper.Map<User>(userRegistertrationDto);

            var result = await userManager.CreateAsync(user, userRegistertrationDto.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                return new RegisterResponse { Errors = errors, IsSuccessfulRegistration = false };
            }


            return new RegisterResponse { IsSuccessfulRegistration = true };
        }
    }
}
