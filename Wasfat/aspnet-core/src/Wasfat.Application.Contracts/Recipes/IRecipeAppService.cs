using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Wasfat.Common;

namespace Wasfat.Recipes
{
    public interface IRecipeAppService : ICrudAppService<
             RecipeDto,
             int,
             PagedAndSortedResultRequestDto>
    {
        Task<List<RecipeDto>> GetRecentAsync(int count = 3);
        Task<List<RecipeDto>> GetAllRecipesAsync();
        Task<List<RecipeDto>> GetFilteredAsync(int categoryId);
        Task<List<RecipeDto>> GetFeaturedAsync();
        Task<List<RecipeDto>> GetHeroDisplayedAsync();
        Task<List<LookupDto>> GetAutoCompleteAsync(string? searchKey);
    }
}
