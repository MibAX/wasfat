using Volo.Abp.Domain.Entities;
using Wasfat.Recipes;

namespace Wasfat.Instructions
{
    public class Instruction : Entity<int>
    {
        public string Text { get; set; }
        public int Order { get; set; }

        public int RecipeId { get; set; }                   // Foreign key to the Recipe entity
        public Recipe Recipe { get; set; } = new Recipe();  // Navigation property to the Recipe entity
    }
}