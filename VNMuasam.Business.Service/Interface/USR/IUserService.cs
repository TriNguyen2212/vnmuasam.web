using VNMuasam.Business.DTO;
using System;
using System.Collections.Generic;

namespace VNMuasam.Business.Service
{
    public interface IUserService : IDisposable
    {
        IEnumerable<UserRes> List();

        IEnumerable<UserRes> Search(string KeyWord, bool? IsAdmin, int? UserTypeID, int? Gender, bool? IsActived, bool? IsLocked, int? PositionID, string DepartmentIDs, int UserID);
    }
}