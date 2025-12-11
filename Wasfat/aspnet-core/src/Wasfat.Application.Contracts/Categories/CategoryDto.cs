using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Wasfat.Recipes;

namespace Wasfat.Categories
{
    public class CategoryDto : EntityDto<int>
    {
        public string Name { get; set; }

        public List<RecipeDto> Recipes { get; set; } = new List<RecipeDto>();
    }
}
