using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Wasfat.Instructions;

namespace Wasfat.Recipes
{
    public class Recipe : Entity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public List<Instruction> Instructions { get; set; } = new();
    }
}
