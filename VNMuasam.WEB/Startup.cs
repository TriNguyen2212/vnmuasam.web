using Core.Infrastructure;
using Owin;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace VNMuasam.WEB
{
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //GlobalConfiguration.Configure(WebApiConfig.Register);

            //appBuilder.UseAutofacWebApi(GlobalConfiguration.Configuration);

            //// token validation
            //appBuilder.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            //{
            //    Authority = AppConfig.Instance.IDSUrl,
            //    RequiredScopes = new[] { "api.scp" },
            //    ValidationMode = ValidationMode.ValidationEndpoint
            //});

            //if (!AppConfig.Instance.TrustedSSLCert)
            //{
            //    ServicePointManager.ServerCertificateValidationCallback = delegate (object s, X509Certificate certificate, X509Chain chain,
            //        SslPolicyErrors sslPolicyErrors)
            //    { return true; };
            //}

            IEngine objEngine = new Engine();
            objEngine.Initialize();

            //RuntimeTypeModel.Default.Add(typeof(System.DateTimeOffset), false).SetSurrogate(typeof(DateTimeOffsetSurrogate));
            //RuntimeTypeModel.Default.Add(typeof(System.DateTimeOffset?), false).SetSurrogate(typeof(DateTimeOffsetSurrogate));
        }
    }
}