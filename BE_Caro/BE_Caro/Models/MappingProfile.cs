using AutoMapper;
using BE_Caro.DataTransferObjects;
using BE_Caro.Models;

namespace BE_Caro.Entities.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserRegister, User>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.UserName));
        }
    }
}