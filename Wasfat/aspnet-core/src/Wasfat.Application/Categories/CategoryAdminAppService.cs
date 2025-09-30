using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Wasfat.Categories
{
    public class CategoryAdminAppService : CrudAppService<Category, CategoryDto, int, PagedAndSortedResultRequestDto>, ICategoryAppService
    {
        public CategoryAdminAppService(
            IRepository<Category, int> categoryRepository
            ) 
        : base(categoryRepository)
        {

        }
    }
}
