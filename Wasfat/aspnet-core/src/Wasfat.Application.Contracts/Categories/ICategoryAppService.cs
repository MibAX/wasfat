using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Wasfat.Categories
{
    public interface ICategoryAppService : ICrudAppService<
             CategoryDto,
             int,
             PagedAndSortedResultRequestDto>
    {

    }
}
