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

        public Recipe Recipe { get; set; } // Navigation property to the Recipe entity
        public Ingredient Ingredient { get; set; } // Navigation property to the Ingredient entity

        public override object?[] GetKeys()
        {
            return new object?[] { RecipeId, IngredientId };
        }
    }
}
