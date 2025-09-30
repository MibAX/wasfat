using AutoMapper;

namespace Wasfat.Categories
{
    public class CategoryMapperProfile : Profile
    {
        public CategoryMapperProfile()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();
        }
    }
}
