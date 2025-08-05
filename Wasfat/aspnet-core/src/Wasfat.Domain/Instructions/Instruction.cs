using Volo.Abp.Domain.Entities;

namespace Wasfat.Instructions
{
    public class Instruction : Entity<int>
    {
        public string Text { get; set; }
        public int Order { get; set; }
    }
}
