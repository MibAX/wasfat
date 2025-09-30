using Volo.Abp.Domain.Entities;

namespace Wasfat.Categories
{
    public class Category : Entity<int>
    {
        public string Name { get; set; }
    }
}
