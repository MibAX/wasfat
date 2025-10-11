using AutoMapper;
using Wasfat.Common;

namespace Wasfat.Ingredients
{
    public class IngredientMapperProfile : Profile
    {
        public IngredientMapperProfile()
        {
            CreateMap<Ingredient, IngredientDto>().ReverseMap();
            CreateMap<Ingredient, LookupDto>().ForMember(dest => dest.DisplayName, 
                                                         opts => opts.MapFrom(src => src.Name));
        }
    }
}
