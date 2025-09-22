using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Wasfat.Categories
{
    public interface ICategoryAdminAppService : ICrudAppService<CategoryDto, int, PagedAndSortedResultRequestDto>
    {
        Task<List<CategoryDto>> GetAllCategoriesAsync();
    }
}
