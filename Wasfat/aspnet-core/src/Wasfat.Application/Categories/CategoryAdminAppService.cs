using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Wasfat.Recipes;

namespace Wasfat.Categories
{
    public class CategoryAdminAppService : CrudAppService<Category, CategoryDto, int, PagedAndSortedResultRequestDto>, ICategoryAdminAppService
    {
        private readonly IRepository<Category, int> _categoryRepository;

        public CategoryAdminAppService(
            IRepository<Category, int> categoryRepository
            ) 
        : base(categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<List<CategoryDto>> GetAllCategoriesAsync()
        {
            var query = await _categoryRepository.GetQueryableAsync();

            var categoryDtos = await query
                                    .Select(c => new CategoryDto() 
                                        { Id = c.Id, 
                                        Name = c.Name, 
                                        RecipesCount = c.Recipes.Count 
                                        })
                                    .ToListAsync();

            return categoryDtos;
        }
    }
}
