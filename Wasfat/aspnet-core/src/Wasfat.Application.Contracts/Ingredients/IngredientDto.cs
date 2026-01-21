using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Wasfat.RecipeIngredients;

namespace Wasfat.Ingredients
{
    public class IngredientDto : EntityDto<int>
    {
        public string Name { get; set; }

        public List<RecipeIngredientDto> RecipeIngredients { get; set; } = new List<RecipeIngredientDto>();
    }
}
