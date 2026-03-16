using Volo.Abp.Domain.Entities;
using Wasfat.Recipes;

namespace Wasfat.Instructions
{
    public class Instruction : Entity<int>
    {
        public string Text { get; set; } 
        public int Order { get; set; }

        public Recipe Recipe { get; set; }
        public int RecipeId { get; set; }   
    }
}
