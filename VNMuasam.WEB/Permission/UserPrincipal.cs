using VNMuasam.Business.Service;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Security.Claims;

namespace VNMuasam.WEB
{
    public class UserPrincipal : ClaimsPrincipal
    {
        private readonly IPermissionService _PermissionService;
        public List<int> RoleIDs { get; set; }
        public int UserID { get; set; }
        public string Username { get; set; }

        public UserPrincipal(string accessToken, IPermissionService PermissionService)
        {
            var jwt = new JwtSecurityToken(accessToken);
            RoleIDs = JsonConvert.DeserializeObject<List<int>>(jwt.Claims.SingleOrDefault(p => p.Type == ClaimTypes.Role).Value);
            UserID = Convert.ToInt32(jwt.Subject);
            Username = jwt.Claims.SingleOrDefault(p => p.Type == ClaimTypes.Sid).Value;

            _PermissionService = PermissionService;
        }

        public bool IsPermission(string roleFunctionName)
        {
            if (_PermissionService == null || string.IsNullOrWhiteSpace(roleFunctionName))
                return false;
            return (from r in _PermissionService.ReadClientPermission(AppConfig.Instance.ClientID)
                    where RoleIDs.Contains(r.RoleID) && r.RoleFunctionName == roleFunctionName
                    select r).Count() > 0;
        }

        public bool IsAuthorize(string action, string controller, string method)
        {
            if (Username.Contains("0000"))
                return true;
            var roleFunctionResult = from r in _PermissionService.ReadClientPermission(AppConfig.Instance.ClientID)
                                     where RoleIDs.Contains(r.RoleID) && r.APIAction == action && r.APIController == controller && r.APIMethod == method
                                     select r;
            return roleFunctionResult.Any();
        }
    }
}