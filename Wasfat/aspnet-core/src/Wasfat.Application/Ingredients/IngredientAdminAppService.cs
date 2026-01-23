using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Wasfat.Common;

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

            var ingredientDtos = ObjectMapper.Map<List<Ingredient>, List<IngredientDto>>(ingredients);

            return ingredientDtos;
        }

        public async Task<List<LookupDto>> GetLookupsAsync()
        {
            var ingredients = await _ingredientsRepository.GetListAsync();

            var ingredientLookupDtos = ObjectMapper.Map<List<Ingredient>, List<LookupDto>>(ingredients);

            return ingredientLookupDtos;
        }
    }
}
