using Volo.Abp.Domain.Entities;

namespace Wasfat.Instructions
{
    public class Instruction : Entity<int>
    {
        public int RecipeId { get; set; }
        public int Order { get; set; }
        public string Text { get; set; }
    }
}
