using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Wasfat.Instructions;

namespace Wasfat.Recipes
{
    public interface IRecipeAppService : ICrudAppService<
             RecipeDto,
             int,
             PagedAndSortedResultRequestDto>
    {

        Task<List<RecipeDto>> GetRecentAsync(int count = 3);

        Task<List<RecipeDto>> GetAllRecipesAsync();

        Task<List<InstructionDto>> GetInstructionsAsync(int recipeId);
    }
}
