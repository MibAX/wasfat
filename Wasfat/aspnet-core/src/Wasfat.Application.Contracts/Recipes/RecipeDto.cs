using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;
using Wasfat.Instructions;

namespace Wasfat.Recipes
{

    public class RecipeDto : EntityDto<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public List<InstructionDto> Instructions { get; set; } = new();

    }
}
