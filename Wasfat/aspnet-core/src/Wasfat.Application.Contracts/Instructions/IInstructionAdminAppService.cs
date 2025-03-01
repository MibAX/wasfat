using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Wasfat.Instructions
{
    public interface IInstructionAdminAppService : ICrudAppService<
             InstructionDto,
             int,
             PagedAndSortedResultRequestDto>
    {

        Task<List<InstructionDto>> GetRecentAsync(int count = 3);

        Task<List<InstructionDto>> GetAllInstructionsAsync();

        Task<List<InstructionDto>> GetRecipeInstructionsAsync(int recipeId);

        Task<int> GetNextInstructionOrderAsync(int recipeId);
    }
}
