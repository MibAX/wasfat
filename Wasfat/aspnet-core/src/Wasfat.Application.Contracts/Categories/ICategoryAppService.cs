using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Wasfat.Common;

namespace Wasfat.Categories
{
    public interface ICategoryAppService : ICrudAppService<
             CategoryDto,
             int,
             PagedAndSortedResultRequestDto>
    {
        Task<List<CategoryDto>> GetAllCategoriesAsync();
        Task<List<LookupDto>> GetLookupsAsync();
    }
}