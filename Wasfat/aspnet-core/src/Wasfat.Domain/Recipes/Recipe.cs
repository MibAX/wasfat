using System.Collections.Generic;
using Volo.Abp.Domain.Entities;
using Wasfat.Instructions;

namespace Wasfat.Recipes
{
    public class Recipe : Entity<int>
    {
        public List<Instruction> Instructions { get; set; } = new();
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
