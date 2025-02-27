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
        public Recipe Recipe { get; set; }
        public int Order { get; set; }
        public string Text { get; set; }
    }
}
