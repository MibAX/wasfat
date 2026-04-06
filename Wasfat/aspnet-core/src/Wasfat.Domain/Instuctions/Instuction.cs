using Volo.Abp.Domain.Entities;

namespace Wasfat.Instuctions
{
    public class Instuction : Entity<int>
    {
        public string Text { get; set; }
        public int Order { get; set; }
    }
}
