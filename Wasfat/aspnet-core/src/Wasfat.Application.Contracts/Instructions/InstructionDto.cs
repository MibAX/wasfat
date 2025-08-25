using Volo.Abp.Application.Dtos;

namespace Wasfat.Instructions
{
    public class InstructionDto : EntityDto<int>
    {
        public string Text { get; set; }
        public int Order { get; set; }
        public int RecipeId { get; set; }
    }
}
