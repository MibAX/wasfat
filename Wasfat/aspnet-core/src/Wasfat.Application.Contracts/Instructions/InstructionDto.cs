using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;
using Wasfat.Recipes;

namespace Wasfat.Instructions
{
    public class InstructionDto : EntityDto<int>
    {
        public int RecipeId { get; set; }
        public RecipeDto Recipe { get; set; }
        public int Order { get; set; }
        public string Text { get; set; }
    }
}
