using BE_Caro.DataTransferObjects;

namespace BE_Caro.Service
{
    public interface AuthService
    {
        public Task<UserRegister> RegistrationResponseDto(UserRegister userRegistertrationDto);
    }
}
