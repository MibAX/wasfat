using AutoMapper;

namespace Wasfat.Instructions
{
    public class InstructionMapperProfile : Profile
    {
        public InstructionMapperProfile()
        {
            CreateMap<Instruction, InstructionDto>().ReverseMap();
        }
    }
}
