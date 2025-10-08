using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Wasfat.Instructions;
using Wasfat.RecipeIngredients;

namespace Wasfat.Recipes
{
    public class CrudRecipeDto : EntityDto<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public List<InstructionDto> Instructions { get; set; } = new List<InstructionDto>();
        public List<int> CategoryIds { get; set; } = new List<int>();
        public List<CrudRecipeIngredientDto> RecipeIngredients { get; set; } = new List<CrudRecipeIngredientDto>();
    }
}
