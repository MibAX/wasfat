using Volo.Abp.Application.Dtos;

namespace Wasfat.Categories
{
    public class CategoryDto : EntityDto<int>
    {
        public string Name { get; set; }
    }
}
