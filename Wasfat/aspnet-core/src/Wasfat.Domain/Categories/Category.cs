using System.Collections.Generic;
using Volo.Abp.Domain.Entities;
using Wasfat.Recipes;

namespace Wasfat.Categories
{
    public class Category : Entity<int>
    {
        public string Name { get; set; }

        public List<Recipe> Recipes { get; set; } = new List<Recipe>(); // Navigation property to the Recipe entity
    }
}
