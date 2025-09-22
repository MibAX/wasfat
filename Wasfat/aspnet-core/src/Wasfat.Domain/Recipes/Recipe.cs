using System.Collections.Generic;
using Volo.Abp.Domain.Entities;
using Wasfat.Categories;
using Wasfat.Instructions;

namespace Wasfat.Recipes
{
    public class Recipe : Entity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public List<Instruction> Instructions { get; set; } = new List<Instruction>(); // Navigation property to the Instruction entity
        public List<Category> Categories{ get; set; } = new List<Category>(); // Navigation property to the Category entity
    }
}
