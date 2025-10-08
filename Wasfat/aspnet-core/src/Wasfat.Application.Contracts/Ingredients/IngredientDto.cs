using Volo.Abp.Application.Dtos;

namespace Wasfat.Ingredients
{
    public class IngredientDto : EntityDto<int>
    {
        public string Name { get; set; }
    }
}
