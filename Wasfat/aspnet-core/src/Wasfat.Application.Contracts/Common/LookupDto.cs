using Volo.Abp.Application.Dtos;

namespace Wasfat.Common
{
    public class LookupDto : EntityDto<int>
    {
        public string DisplayName { get; set; }
    }
}
