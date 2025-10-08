using AutoMapper;

namespace Wasfat.RecipeIngredients
{
    public class RecipeIngredientMapperProfile : Profile
    {
        public RecipeIngredientMapperProfile()
        {
            CreateMap<RecipeIngredient, RecipeIngredientDto>();
            CreateMap<RecipeIngredient, CrudRecipeIngredientDto>().ReverseMap();
        }
    }
}
