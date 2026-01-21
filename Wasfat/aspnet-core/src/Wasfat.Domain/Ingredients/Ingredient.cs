using System.Collections.Generic;
using Volo.Abp.Domain.Entities;
using Wasfat.RecipeIngredients;

namespace Wasfat.Ingredients
{
    public class Ingredient : Entity<int>
    {
        public string Name { get; set; }

        public List<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>(); // Navigation property to the RecipeIngredient entity
    }
}
