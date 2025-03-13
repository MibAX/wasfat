using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

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


        public override async Task<RecipeDto> GetAsync(int id)
        {
            var query = await _recipesRepository.GetQueryableAsync();

            var recipe = await query
                .Include(r => r.Instructions)
                .SingleAsync(r => r.Id == id);

            // custom logic
            recipe.Name = recipe.Name.Trim();

            var recipeDto = ObjectMapper.Map<Recipe, RecipeDto>(recipe);

            return recipeDto;
        }


        public override async Task<RecipeDto> CreateAsync(RecipeDto input)
        {
            var recipe = ObjectMapper.Map<RecipeDto, Recipe>(input);

            // custom logic
            recipe.Name = recipe.Name.Trim();

            await _recipesRepository.InsertAsync(recipe, autoSave: true);

            var recipeDto = ObjectMapper.Map<Recipe, RecipeDto>(recipe);

            return recipeDto;
        }


        public override async Task<RecipeDto> UpdateAsync(int id, RecipeDto input)
        {
            var recipe = await _recipesRepository.GetAsync(id);

            input.Id = id;           

            // Only the available values from the input DTO will be applied to the recipe entity.
            // IMPORTANT: Any values not present in the DTO will remain unchanged in the recipe.
            ObjectMapper.Map<RecipeDto, Recipe>(input, recipe);

            await _recipesRepository.UpdateAsync(recipe, autoSave: true);

            var recipeDto = ObjectMapper.Map<Recipe, RecipeDto>(recipe);

            return recipeDto;
        }


        public override async Task DeleteAsync(int id)
        {
            var recipe = await _recipesRepository.GetAsync(id);

            // custom logic
            if (recipe.Name.Contains("Shawarma", StringComparison.OrdinalIgnoreCase))
            {
                throw new UserFriendlyException("you can not delete burgers");
            }

            await _recipesRepository.DeleteAsync(id);
        }


        public override async Task<PagedResultDto<RecipeDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            var totalCount = await _recipesRepository.GetCountAsync();

            var recipes = await _recipesRepository.GetPagedListAsync(
                input.SkipCount,
                input.MaxResultCount,
                input.Sorting ?? nameof(Recipe.Name)
                );

            // custom logic goes here  


            var recipeDtos = ObjectMapper.Map<List<Recipe>, List<RecipeDto>>(recipes);

            var pagedResultDto = new PagedResultDto<RecipeDto>(totalCount, recipeDtos);

            return pagedResultDto;
        }

        public async Task<List<RecipeDto>> GetRecentAsync(int count = 3)
        {
            var query = await _recipesRepository.GetQueryableAsync();

            var recentRecipes = query
                                .OrderByDescending(recipe => recipe.Id)
                                .Take(count)
                                .ToList();

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
