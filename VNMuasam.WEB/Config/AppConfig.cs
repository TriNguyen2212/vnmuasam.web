using System;
using System.Configuration;

namespace VNMuasam.API
{
    public class AppConfig
    {
        private static readonly Lazy<AppConfig> lazy = new Lazy<AppConfig>(() => new AppConfig());

        public static AppConfig Instance { get { return lazy.Value; } }

        private AppConfig()
        {
            _iDSUrl = ConfigurationManager.AppSettings["IDSUrl"];
            _swaggerClientID = ConfigurationManager.AppSettings["SwaggerClientID"];
            _swaggerSecretKey = ConfigurationManager.AppSettings["SwaggerSecretKey"];
            _trustedSSLCert = Convert.ToBoolean(ConfigurationManager.AppSettings["TrustedSSLCert"]);
            _apiCommonUrl = ConfigurationManager.AppSettings["ApiCommonUrl"];
            _clientCredentialSecret = ConfigurationManager.AppSettings["ClientCredentialSecret"];
            _clientCredentialId = ConfigurationManager.AppSettings["ClientCredentialId"];
            _clientID = int.Parse(ConfigurationManager.AppSettings["ClientID"]);
        }

        private int _clientID { get; set; }
        public int ClientID { get { return _clientID; } }

        private string _clientCredentialId { get; set; }
        public string ClientCredentialId { get { return _clientCredentialId; } }

        private string _clientCredentialSecret { get; set; }
        public string ClientCredentialSecret { get { return _clientCredentialSecret; } }

        private string _iDSUrl { get; set; }
        public string IDSUrl { get { return _iDSUrl; } }

        private string _swaggerClientID { get; set; }
        public string SwaggerClientID { get { return _swaggerClientID; } }

        private string _swaggerSecretKey { get; set; }
        public string SwaggerSecretKey { get { return _swaggerSecretKey; } }

        private string _apiCommonUrl { get; set; }
        public string ApiCommonUrl { get { return _apiCommonUrl; } }

        private bool _trustedSSLCert { get; set; }
        public bool TrustedSSLCert
        {
            get
            {
                return _trustedSSLCert;
            }
        }
    }
}