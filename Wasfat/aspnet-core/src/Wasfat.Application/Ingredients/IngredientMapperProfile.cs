using AutoMapper;

namespace Wasfat.Ingredients
{
    public class IngredientMapperProfile : Profile
    {
        public IngredientMapperProfile()
        {
            CreateMap<Ingredient, IngredientDto>().ReverseMap();
        }
    }
}
