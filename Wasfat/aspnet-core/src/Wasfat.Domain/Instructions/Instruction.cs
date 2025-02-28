using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Wasfat.Recipes;

namespace Wasfat.Instructions
{
    public class Instruction : Entity<int>
    {
        public int RecipeId { get; set; }
        public int Order { get; set; }      // Specifies the order of this instruction within the recipe
        public string Text { get; set; }
    }
}
