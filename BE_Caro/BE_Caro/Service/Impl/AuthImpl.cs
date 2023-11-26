using AutoMapper;
using BE_Caro.DataTransferObjects;
using BE_Caro.Models;
using Microsoft.AspNetCore.Identity;

namespace BE_Caro.Service.Impt
{
    public class AuthImpl : AuthService
    {
        private readonly UserManager<User> userManager;
        private readonly IMapper mapper;

        public AuthImpl(UserManager<User> userManager, IMapper mapper)
        {
            this.userManager = userManager;
            this.mapper = mapper;
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
