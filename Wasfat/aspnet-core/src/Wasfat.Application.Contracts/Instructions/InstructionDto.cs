using Volo.Abp.Application.Dtos;

namespace Wasfat.Instructions
{
    public class InstructionDto : EntityDto<int>
    {
        public int RecipeId { get; set; }
        public int Order { get; set; }
        public string Text { get; set; }
    }
}
