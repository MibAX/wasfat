using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Wasfat.Instructions
{
    public interface IInstructionAppService : ICrudAppService<
             InstructionDto,
             int,
             PagedAndSortedResultRequestDto>
    {

        Task<List<InstructionDto>> GetRecentAsync(int count = 3);

        Task<List<InstructionDto>> GetAllInstructionsAsync();
    }
}
