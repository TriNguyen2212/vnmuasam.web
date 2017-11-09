using Autofac;
using Core.Cache;
using Core.Cache.Implement;
using Core.Cache.Interface;
using Core.DataAccess.Implement;
using Core.DataAccess.Interface;
using Core.Infrastructure;
using Core.Log.Implement;
using Core.Log.Interface;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using VNMuasam.Business.Service;
using Core.Kafka;
using Core.Kafka.Implement;
using Autofac.Integration.WebApi;
using System.Web.Http;
using Autofac.Integration.Mvc;
using System.Web.Mvc;

namespace VNMuasam.WEB
{
    public class DependencyRegistrar : IDependencyRegistrar
    {
        public void Register(InfrastructureConfig config)
        {
            var builder = new ContainerBuilder();
            builder.RegisterControllers(Assembly.GetExecutingAssembly());
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterWebApiFilterProvider(GlobalConfiguration.Configuration);
            builder.RegisterInstance(config).As<InfrastructureConfig>().SingleInstance();

            builder.RegisterInstance(NLog.LogManager.GetCurrentClassLogger()).As<NLog.Logger>().SingleInstance();
            builder.RegisterType<NLogger>().As<ILogger>().InstancePerLifetimeScope();

            //builder.RegisterType<Core.Log.Implement.EsClient<Core.API.APILogEntry>>().As<IEsClient<Core.API.APILogEntry>>().InstancePerLifetimeScope();

            builder.Register(c => new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString))
                .As<IDbConnection>().InstancePerLifetimeScope();
            builder.RegisterType<DapperReadOnlyRepository>().As<IReadOnlyRepository>().InstancePerLifetimeScope();
            builder.RegisterType<DapperRepository>().As<IRepository>().InstancePerLifetimeScope();
            if (config.IsUseRedisCache)
            {
                builder.RegisterType<RedisConnectionWrapper>().As<IRedisConnectionWrapper>().SingleInstance();
                builder.RegisterType<RedisPubSub>().As<IRedisPubSub>().SingleInstance();
                builder.RegisterType<RedisCacheManager>().Keyed<ICacheManager>(CacheType.RedisCache).SingleInstance();
                builder.RegisterType<CacheHelperUseRedis>().As<ICacheHelper>().SingleInstance();
                //builder.Register(c => new APIClient(new HttpClient())).As<IAPIClient>().SingleInstance();
            }
            else
            {
                if (config.UseAppCache)
                    builder.RegisterType<CacheHelperNoRedis>().As<ICacheHelper>().InstancePerLifetimeScope();
                else
                    builder.RegisterType<DisableCacheHelper>().As<ICacheHelper>().InstancePerLifetimeScope();
                //API client
                //builder.Register(c => new APIClient(new HttpClient())).As<IAPIClient>().InstancePerLifetimeScope();
            }

            if (config.UseAppCache)
            {
                builder.RegisterType<HttpContextCacheManager>().Keyed<ICacheManager>(CacheType.HttpContextCache).InstancePerLifetimeScope();
                builder.RegisterType<MemCacheManager>().Keyed<ICacheManager>(CacheType.MemoryCache).InstancePerLifetimeScope();
            }
            else
            {
                builder.RegisterType<DisableCache>().Keyed<ICacheManager>(CacheType.HttpContextCache).InstancePerLifetimeScope();
                builder.RegisterType<DisableCache>().Keyed<ICacheManager>(CacheType.MemoryCache).InstancePerLifetimeScope();
            }
            if (config.IsUsedKa)
            {
                builder.RegisterType<KafkaHelper>().As<IKafkaHelper>().SingleInstance();
                builder.RegisterType<KafkaWrapper>().As<IKafkaWrapper>().SingleInstance();
            }
            else
                builder.RegisterType<DisableKafkaHelper>().As<IKafkaHelper>().InstancePerLifetimeScope();

            //builder.RegisterType<UserService>().As<IUserService>().InstancePerLifetimeScope();
            // Services
            builder.RegisterAssemblyTypes(typeof(IUserService).Assembly)
               .Where(t => t.Name.EndsWith("Service"))
               .AsImplementedInterfaces().InstancePerRequest();

            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}