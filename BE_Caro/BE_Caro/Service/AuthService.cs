using BE_Caro.DataTransferObjects;

namespace BE_Caro.Service
{
    public interface AuthService
    {
        public Task<RegisterResponse> RegistrationResponseDto(UserRegister userRegistertrationDto);
        public Task<LoginResponse> loginResponseAsync(UserLogin userAuthentication);

    }
}
