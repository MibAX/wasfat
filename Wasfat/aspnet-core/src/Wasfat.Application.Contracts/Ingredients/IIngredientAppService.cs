using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Wasfat.Ingredients
{
    public interface IIngredientAppService : ICrudAppService<
        IngredientDto,
        int,
        PagedAndSortedResultRequestDto>
    {
    }
}