using Volo.Abp.Domain.Entities;
using Wasfat.Ingredients;
using Wasfat.Recipes;

namespace Wasfat.RecipeIngredients
{
    public class RecipeIngredient : Entity
    {
        public int RecipeId { get; set; }
        public int IngredientId { get; set; }

        public decimal Quantity { get; set; }
        public MeasurementUnit Unit { get; set; }

        // Navigation properties
        public Recipe Recipe { get; set; }
        public Ingredient Ingredient { get; set; }

        public override object?[] GetKeys()
        {
            return new object?[] { RecipeId, IngredientId };
        }
    }
}
