using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Wasfat.Common;

namespace Wasfat.Categories
{
    public interface ICategoryAdminAppService : ICrudAppService<CategoryDto, int, PagedAndSortedResultRequestDto, CrudCategoryDto>
    {
        Task<List<CategoryDto>> GetAllCategoriesAsync();
        Task<ListResultDto<LookupDto<int>>> GetLookupAsync();
    }
}
