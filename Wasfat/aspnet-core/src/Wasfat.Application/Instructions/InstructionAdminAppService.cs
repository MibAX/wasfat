using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Microsoft.Extensions.Logging;

namespace Wasfat.Instructions
{
    public class InstructionAdminAppService : CrudAppService<Instruction, InstructionDto, int, PagedAndSortedResultRequestDto>, IInstructionAdminAppService
    {
        private readonly IRepository<Instruction, int> _instructionsRepository;
        private readonly ILogger<InstructionAdminAppService> _logger;

        public InstructionAdminAppService(
            IRepository<Instruction, int> instructionsRepository,
            ILogger<InstructionAdminAppService> logger
            )
        : base(instructionsRepository)
        {
            _instructionsRepository = instructionsRepository;
            _logger = logger;
        }

        public override async Task<InstructionDto> GetAsync(int id)
        {
            var instruction = await _instructionsRepository.GetAsync(id);

            // custom logic
            instruction.Text = instruction.Text.Trim();

            var instructionDto = ObjectMapper.Map<Instruction, InstructionDto>(instruction);

            return instructionDto;
        }

        public override async Task<InstructionDto> CreateAsync(InstructionDto input)
        {
            _logger.LogInformation("CreateAsync called with input: {@input}", input);

            if (input.RecipeId == 0)
            {
                throw new UserFriendlyException("The Recipe field is required.");
            }

            var instruction = ObjectMapper.Map<InstructionDto, Instruction>(input);

            // custom logic
            instruction.Text = instruction.Text.Trim();

            await _instructionsRepository.InsertAsync(instruction, autoSave: true);

            var instructionDto = ObjectMapper.Map<Instruction, InstructionDto>(instruction);

            return instructionDto;
        }

        public override async Task<InstructionDto> UpdateAsync(int id, InstructionDto input)
        {
            _logger.LogInformation("UpdateAsync called with id: {id}, input: {@input}", id, input);

            var instruction = await _instructionsRepository.GetAsync(id);

            input.Id = id;

            // Only the available values from the input DTO will be applied to the instruction entity.
            // IMPORTANT: Any values not present in the DTO will remain unchanged in the instruction.
            ObjectMapper.Map<InstructionDto, Instruction>(input, instruction);

            await _instructionsRepository.UpdateAsync(instruction, autoSave: true);

            var instructionDto = ObjectMapper.Map<Instruction, InstructionDto>(instruction);

            return instructionDto;
        }

        public override async Task DeleteAsync(int id)
        {
            var instruction = await _instructionsRepository.GetAsync(id);

            // custom logic
            if (instruction.Text.Contains("Shawarma", StringComparison.OrdinalIgnoreCase))
            {
                throw new UserFriendlyException("you can not delete burgers");
            }

            await _instructionsRepository.DeleteAsync(id);
        }

        public override async Task<PagedResultDto<InstructionDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            var totalCount = await _instructionsRepository.GetCountAsync();

            var instructions = await _instructionsRepository.GetPagedListAsync(
                input.SkipCount,
                input.MaxResultCount,
                input.Sorting ?? nameof(Instruction.Text)
                );

            // custom logic goes here  


            var instructionDtos = ObjectMapper.Map<List<Instruction>, List<InstructionDto>>(instructions);

            var pagedResultDto = new PagedResultDto<InstructionDto>(totalCount, instructionDtos);

            return pagedResultDto;
        }

        public async Task<List<InstructionDto>> GetRecentAsync(int count = 3)
        {
            var query = await _instructionsRepository.GetQueryableAsync();

            var recentInstructions = query
                                .OrderByDescending(instruction => instruction.Id)
                                .Take(count)
                                .ToList();

            var recentInstructionDtos = ObjectMapper.Map<List<Instruction>, List<InstructionDto>>(recentInstructions);

            return recentInstructionDtos;
        }

        public async Task<List<InstructionDto>> GetAllInstructionsAsync()
        {
            var instructions = await _instructionsRepository.GetListAsync();
// 
            var instructionDtos = ObjectMapper.Map<List<Instruction>, List<InstructionDto>>(instructions);

            return instructionDtos;
        }

        public async Task<List<InstructionDto>> GetRecipeInstructionsAsync(int recipeId)
        {
            var instructions = await _instructionsRepository.GetListAsync(i => i.RecipeId == recipeId);

            var sortedInstructions = instructions.OrderBy(i => i.Order).ToList();
            return ObjectMapper.Map<List<Instruction>, List<InstructionDto>>(sortedInstructions);
        }

        public async Task<int> GetNextInstructionOrderAsync(int recipeId)
        {
            var instructions = await _instructionsRepository.GetListAsync(i => i.RecipeId == recipeId);

            if (instructions.Any())
            {
                return instructions.Max(i => i.Order) + 1;
            }
            return 1;
        }

    }
}
