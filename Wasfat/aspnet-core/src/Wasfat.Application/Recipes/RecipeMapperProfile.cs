using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wasfat.Common;

namespace Wasfat.Recipes
{
    public class RecipeMapperProfile : Profile
    {
        public RecipeMapperProfile()
        {
            CreateMap<RecipeDto, Recipe>();
            CreateMap<Recipe, RecipeDto>().ForMember(dest => dest.CategoryIds,
                                                     opt => opt.MapFrom(src => src.Categories.Select(c => c.Id).ToList()));
            CreateMap<Recipe, LookupDto>().ForMember(dest => dest.DisplayName,
                                                     opt => opt.MapFrom(src => src.Name));
        }
    }
}
