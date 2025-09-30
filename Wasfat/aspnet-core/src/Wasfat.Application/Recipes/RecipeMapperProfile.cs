using AutoMapper;
using System.Linq;

namespace Wasfat.Recipes
{
    public class RecipeMapperProfile : Profile
    {
        public RecipeMapperProfile()
        {
            CreateMap<RecipeDto, Recipe>();
            CreateMap<Recipe, RecipeDto>().ForMember(dest => dest.CategoryIds,
                                                     opt => opt.MapFrom(src => src.Categories.Select(c => c.Id).ToList()));
        }
    }
}
