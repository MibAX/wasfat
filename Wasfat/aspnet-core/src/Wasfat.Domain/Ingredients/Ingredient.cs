using Volo.Abp.Domain.Entities;

namespace Wasfat.Ingredients
{
    public class Ingredient : Entity<int>
    {
        public string Name { get; set; }
    }
}
