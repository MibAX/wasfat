using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;
using Wasfat.Categories;
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

        public async Task<List<LookupDto>> GetAutoCompleteAsync(string? searchKey, int[] selectedIds)
        {
            var query = await _ingredientsRepository.GetQueryableAsync();

            var ingredients = await query.Where(i => i.Name.Contains(searchKey) && !selectedIds.Contains(i.Id)).ToListAsync();

            var ingredientLookups = ObjectMapper.Map<List<Ingredient>, List<LookupDto>>(ingredients);

            return ingredientLookups;
        }

        public async Task<List<LookupDto>> GetLookupsAsync()
        {
            var ingredients = await _ingredientsRepository.GetListAsync();

            var ingredientLookupDtos = ObjectMapper.Map<List<Ingredient>, List<LookupDto>>(ingredients);

            return ingredientLookupDtos;
        }
    }
}
