using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Wasfat.Categories;
using Wasfat.Instructions;
using Wasfat.RecipeIngredients;

namespace Wasfat.Recipes
{

    public class RecipeDto : EntityDto<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsDisplayedInHero { get; set; }

        public List<InstructionDto> Instructions { get; set; } = new List<InstructionDto>();
        public List<CategoryDto> Categories { get; set; } = new List<CategoryDto>();
        public List<int> CategoryIds { get; set; } = new List<int>();
        public List<RecipeIngredientDto> RecipeIngredients { get; set; } = new List<RecipeIngredientDto>();
    }
}
