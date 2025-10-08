using AutoMapper;
using System.Linq;

namespace Wasfat.Recipes
{
    public class RecipeMapperProfile : Profile
    {
        public RecipeMapperProfile()
        {
            CreateMap<Recipe, RecipeDto>();
            CreateMap<CrudRecipeDto, Recipe>();
            CreateMap<Recipe, CrudRecipeDto>().ForMember(dest => dest.CategoryIds,
                                                         opt => opt.MapFrom(src => src.Categories.Select(c => c.Id).ToList()));
        }
    }
}
