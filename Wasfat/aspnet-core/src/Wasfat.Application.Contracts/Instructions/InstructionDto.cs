using Volo.Abp.Application.Dtos;

namespace Wasfat.Instructions
{
    public class InstructionDto : EntityDto<int>
    {
        public int RecipeId { get; set; }
        public int Order { get; set; }      // Specifies the order of this instruction within the recipe
        public string Text { get; set; }
    }
}
