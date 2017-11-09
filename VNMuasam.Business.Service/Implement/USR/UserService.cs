using VNMuasam.Business.DTO;
using Core.Cache.Interface;
using Core.DataAccess.Interface;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace VNMuasam.Business.Service
{
    /// <summary>
    public class UserService : IUserService
    {
        private readonly Lazy<IRepository> _repository;
        private readonly Lazy<IReadOnlyRepository> _readOnlyRepository;
        private readonly ICacheHelper _CacheHelper;
        private bool _disposedValue = false;

        public UserService(Lazy<IRepository> repository, Lazy<IReadOnlyRepository> readOnlyRepository, ICacheHelper CacheHelper)
        {
            _repository = repository;
            _readOnlyRepository = readOnlyRepository;
            _CacheHelper = CacheHelper;
        }

        private IEnumerable<UserRes> UserReadAll()
        {
            var result = _CacheHelper.Get<List<UserRes>>(CacheKeys.Key_User, () =>
            {
                return _readOnlyRepository.Value.Connection.Query<UserRes>("USR.User_GetAll", commandType: CommandType.StoredProcedure).ToList();
            });
            return result;
        }

        public IEnumerable<UserRes> Search(string KeyWord, bool? IsAdmin, int? UserTypeID, int? Gender, bool? IsActived, bool? IsLocked, int? PositionID, string DepartmentIDs, int UserID)
        {
            return from u in UserReadAll()
                   where
                        (string.IsNullOrEmpty(KeyWord) || (u.Username != null && u.Username.ToLower() == KeyWord.ToLower()))
                      && (UserTypeID == null || u.UserTypeID == UserTypeID)
                      && (Gender == null || u.Gender == Gender)
                      && (IsActived == null || u.IsActived == IsActived)
                      && (IsLocked == null || u.IsLocked == IsLocked)
                      && (PositionID == null || u.PositionID == PositionID)
                      && (string.IsNullOrEmpty(DepartmentIDs) || DepartmentIDs.Split(',').Any(x => x == u.DepartmentID.ToString()) == true)
                   select u;
        }

        public IEnumerable<UserRes> List()
        {
            return UserReadAll();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    if (_repository.IsValueCreated)
                        _repository.Value.Dispose();
                    if (_readOnlyRepository.IsValueCreated)
                        _readOnlyRepository.Value.Dispose();
                    _CacheHelper.Dispose();
                }
                _disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        ~UserService()
        {
            Dispose(false);
        }
    }
}