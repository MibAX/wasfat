using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Wasfat.Categories;

namespace Wasfat.Recipes
{
    public class RecipeAdminAppService : CrudAppService<Recipe, RecipeDto, int, PagedAndSortedResultRequestDto>, IRecipeAppService
    {
        private readonly IRepository<Recipe, int> _recipesRepository;
        private readonly IRepository<Category, int> _categoryRepository;

        public RecipeAdminAppService(
            IRepository<Recipe, int> recipesRepository,
            IRepository<Category, int> categoryRepository
            )
        : base(recipesRepository)
        {
            _recipesRepository = recipesRepository;
            _categoryRepository = categoryRepository;
        }


        public override async Task<RecipeDto> GetAsync(int id)
        {
            var query = await _recipesRepository.GetQueryableAsync();

            var recipe = await query
                               .Include(r => r.Instructions.OrderBy(i => i.Order))
                               .Include(r => r.Categories)
                               .SingleOrDefaultAsync(r => r.Id == id);

            // custome logic
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
            var query = await _recipesRepository.GetQueryableAsync();

            var recipe = await query
                               .Include(r => r.Instructions.OrderBy(i => i.Order))
                               .Include(r => r.Categories)
                               .SingleOrDefaultAsync(r => r.Id == id);

            input.Id = id;

            // Only the available values from the input DTO will be applied to the recipe entity.
            // IMPORTANT: Any values not present in the DTO will remain unchanged in the recipe.
            ObjectMapper.Map<RecipeDto, Recipe>(input, recipe);

            recipe.Categories.Clear();

            await AddCategoriesToRecipe(input.CategoryIds, recipe);

            await _recipesRepository.UpdateAsync(recipe, autoSave: true);

            var recipeDto = ObjectMapper.Map<Recipe, RecipeDto>(recipe);

            return recipeDto;

            #region Local Functions

            async Task AddCategoriesToRecipe(List<int> categoryIds, Recipe recipe)
            {
                var existingCategories = await _categoryRepository.GetListAsync(c => categoryIds.Contains(c.Id));

                recipe.Categories.AddRange(existingCategories);
            } 

            #endregion
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

        //public async Task<List<RecipeDto>> GetAllRecipesAsync()
        //{
        //    var recipes = await _recipesRepository.GetListAsync();

        //    var recipeDtos = ObjectMapper.Map<List<Recipe>, List<RecipeDto>>(recipes);

        //    return recipeDtos;
        //}


        public async Task<List<RecipeDto>> GetAllAsync()
        {
            var recipes = await _recipesRepository.GetListAsync();

            var recipeDtos = ObjectMapper.Map<List<Recipe>, List<RecipeDto>>(recipes);

            return recipeDtos;
        }

        public async Task<List<RecipeDto>> GetFilteredAsync(int categoryId)
        {
            var query = await _recipesRepository.GetQueryableAsync();

            var recipes = await query
                                .WhereIf(categoryId, r => r.Categories.Any(c => c.Id == categoryId))
                                .ToListAsync();

            var recipeDtos = ObjectMapper.Map<List<Recipe>, List<RecipeDto>>(recipes);

            return recipeDtos;
        }
    }
}
