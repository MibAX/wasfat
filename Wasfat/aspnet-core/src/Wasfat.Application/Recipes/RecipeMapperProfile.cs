using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wasfat.Recipes
{
    public class RecipeMapperProfile : Profile
    {
        public RecipeMapperProfile()
        {
            CreateMap<Recipe, RecipeDto>().ForMember(dest => dest.CategoryIds, 
                                                     opt => opt.MapFrom(src => src.Categories.Select(c => c.Id)));
            CreateMap<RecipeDto, Recipe>();
        }
    }
}
