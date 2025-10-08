using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Wasfat.Ingredients
{
    public class IngredientAdminAppService : CrudAppService<Ingredient, IngredientDto, int, PagedAndSortedResultRequestDto>, IIngredientAppService
    {
        private readonly IRepository<Ingredient, int> _ingredientsRepository;

        public IngredientAdminAppService(
            IRepository<Ingredient, int> ingredientsRepository
            ) 
        : base(ingredientsRepository) 
        {
            _ingredientsRepository = ingredientsRepository;
        }

        public async Task<List<IngredientDto>> GetAllIngredientsAsync()
        {
            var ingredients = await _ingredientsRepository.GetListAsync();

            var categoryDtos = ObjectMapper.Map<List<Ingredient>, List<IngredientDto>>(ingredients);

            return categoryDtos;
        }
    }
}
