using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Wasfat.Ingredients
{
    public class IngredientAdminAppService : CrudAppService<Ingredient, IngredientDto, int, PagedAndSortedResultRequestDto>, IIngredientAppService
    {
        public IngredientAdminAppService(
            IRepository<Ingredient, int> ingredientsRepository
            )
        : base(ingredientsRepository)
        {

        }
    }
}
