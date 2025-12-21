using AutoMapper;
using Wasfat.Common;

namespace Wasfat.Categories
{
    public class CategoryMapperProfile : Profile
    {
        public CategoryMapperProfile()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Category, LookupDto>().ForMember(dest => dest.DisplayName,
                                                      opt => opt.MapFrom(src => src.Name));
        }
    }
}
