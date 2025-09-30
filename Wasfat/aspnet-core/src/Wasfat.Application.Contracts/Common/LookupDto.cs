using Volo.Abp.Application.Dtos;

namespace Wasfat.Common
{
    public class LookupDto<TKey> : EntityDto<TKey>
    {
        public string DisplayName { get; set; }
    }
}
