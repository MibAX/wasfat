using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Wasfat.Common;

namespace Wasfat.Categories
{
    public class CategoryAdminAppService : CrudAppService<Category, CategoryDto, int, PagedAndSortedResultRequestDto>, ICategoryAppService
    {
        private readonly IRepository<Category, int> _categoriesRepository;

        public CategoryAdminAppService(
            IRepository<Category, int> categoryRepository
            ) 
        : base(categoryRepository)
        {
            _categoriesRepository = categoryRepository;
        }

        public async Task<List<CategoryDto>> GetAllCategoriesAsync()
        {
            var categories = await _categoriesRepository.GetListAsync();

            var categoryDtos = ObjectMapper.Map<List<Category>, List<CategoryDto>>(categories);

            return categoryDtos;
        }

        public async Task<List<LookupDto>> GetLookupsAsync()
        {
            var categories = await _categoriesRepository.GetListAsync();

            var categoryLookupDtos = ObjectMapper.Map<List<Category>, List<LookupDto>>(categories);

            return categoryLookupDtos;
        }
    }
}
