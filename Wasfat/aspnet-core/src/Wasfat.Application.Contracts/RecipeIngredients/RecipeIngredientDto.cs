using Volo.Abp.Application.Dtos;
using Wasfat.Ingredients;
using Wasfat.Recipes;

namespace Wasfat.RecipeIngredients
{
    public class RecipeIngredientDto : EntityDto
    {
        public int RecipeId { get; set; }
        public int IngredientId { get; set; }

        public decimal Quantity { get; set; }
        public MeasurementUnit Unit { get; set; }

        public RecipeDto Recipe { get; set; }
        public IngredientDto Ingredient { get; set; }
    }
}
