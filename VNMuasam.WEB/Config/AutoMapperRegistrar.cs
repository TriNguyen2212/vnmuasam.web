using AutoMapper;
using Core.Infrastructure;
using VNMuasam.Business.Service.AutoMap;

namespace VNMuasam.WEB
{
    public class AutoMapperRegistrar : IAutoMapperRegistrar
    {
        public void RegisterProfile()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<CommonAutoMap>();
            });
        }
    }
}