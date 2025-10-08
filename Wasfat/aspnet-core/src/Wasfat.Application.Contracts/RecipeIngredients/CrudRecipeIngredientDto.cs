using Volo.Abp.Application.Dtos;

namespace Wasfat.RecipeIngredients
{
    public class CrudRecipeIngredientDto : EntityDto
    {
        public int RecipeId { get; set; }
        public int IngredientId { get; set; }

        public decimal Quantity { get; set; }
        public MeasurementUnit Unit { get; set; }
    }
}
