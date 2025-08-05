using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;

namespace Wasfat.Recipes
{
    public class RecipeAdminAppService : CrudAppService<Recipe, RecipeDto, int, PagedAndSortedResultRequestDto>, IRecipeAppService
    {
        private readonly IRepository<Recipe, int> _recipesRepository;

        public RecipeAdminAppService(
            IRepository<Recipe, int> recipesRepository
            )
        : base(recipesRepository)
        {
            _recipesRepository = recipesRepository;
        }

        public override async Task<PagedResultDto<RecipeDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            var totalCount = await _recipesRepository.GetCountAsync();

            var recipes = await _recipesRepository.GetPagedListAsync(
                input.SkipCount,
                input.MaxResultCount,
                input.Sorting ?? nameof(Recipe.Name)
                );

            // Custom logic goes here ...

            var recipeDtos = ObjectMapper.Map<List<Recipe>, List<RecipeDto>>(recipes);

            var pagedResultDto = new PagedResultDto<RecipeDto>(totalCount, recipeDtos);

            return pagedResultDto;
        }

        public override async Task<RecipeDto> GetAsync(int id)
        {
            var query = await _recipesRepository.GetQueryableAsync();

            var recipe = await query
                               .Include(r => r.Instructions.OrderBy(i => i.Order))
                               .SingleOrDefaultAsync(r => r.Id == id);

            // Ensure the recipe exists before proceeding; throw if not found.
            if (recipe == null)
            {
                throw new EntityNotFoundException(typeof(Recipe), id);
            }

            // Custom logic
            recipe.Name = recipe.Name.Trim();

            var recipeDto = ObjectMapper.Map<Recipe, RecipeDto>(recipe);

            return recipeDto;
        }

        public override async Task<RecipeDto> CreateAsync(RecipeDto input)
        {
            var recipe = ObjectMapper.Map<RecipeDto, Recipe>(input);

            // Custom logic
            recipe.Name = recipe.Name.Trim();

            await _recipesRepository.InsertAsync(recipe, autoSave: true);

            var recipeDto = ObjectMapper.Map<Recipe, RecipeDto>(recipe);

            return recipeDto;
        }

        public override async Task<RecipeDto> UpdateAsync(int id, RecipeDto input)
        {
            // Validate that the input DTO's ID matches the expected route ID (if provided).
            if (input.Id != 0 && input.Id != id)
            {
                throw new UserFriendlyException("Mismatched Recipe ID.");
            }

            var query = await _recipesRepository.GetQueryableAsync();

            var recipe = await query
                               .Include(r => r.Instructions.OrderBy(i => i.Order))
                               .SingleOrDefaultAsync(r => r.Id == id);

            // Ensure the recipe exists before proceeding; throw if not found.
            if (recipe == null)
            {
                throw new EntityNotFoundException(typeof(Recipe), id);
            }

            // Only the available values from the input DTO will be applied to the recipe entity.
            // IMPORTANT: Any values not present in the DTO will remain unchanged in the recipe.
            ObjectMapper.Map(input, recipe);

            // EF Core will track changes to the recipe entity and it's related instructions.
            // All instructions will be updated, added, or removed based on the input DTO.
            await _recipesRepository.UpdateAsync(recipe, autoSave: true);

            var recipeDto = ObjectMapper.Map<Recipe, RecipeDto>(recipe);

            return recipeDto;
        }

        public override async Task DeleteAsync(int id)
        {
            var recipe = await _recipesRepository.GetAsync(id);

            // Custom logic
            if (recipe.Name.Contains("Shawarma", StringComparison.OrdinalIgnoreCase)) 
            {
                throw new UserFriendlyException("You cannot delete Shawarma recipes.");
            }

            await _recipesRepository.DeleteAsync(id);
        }

        public async Task<List<RecipeDto>> GetRecentAsync(int count = 3)
        {
            var query = await _recipesRepository.GetQueryableAsync();

            var recentRecipes = await query
                                      .OrderByDescending(recipe => recipe.Id)
                                      .Take(count)
                                      .ToListAsync();

            var recentRecipeDtos = ObjectMapper.Map<List<Recipe>, List<RecipeDto>>(recentRecipes);

            return recentRecipeDtos;
        }

        public async Task<List<RecipeDto>> GetAllRecipesAsync()
        {
            var recipes = await _recipesRepository.GetListAsync();

            var recipeDtos = ObjectMapper.Map<List<Recipe>, List<RecipeDto>>(recipes);

            return recipeDtos;
        }
    }
}
