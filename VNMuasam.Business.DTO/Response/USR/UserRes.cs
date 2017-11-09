using Core.DTO;
using ProtoBuf;
using System;
using System.Collections.Generic;

namespace VNMuasam.Business.DTO
{
    //[Serializable]
    [ProtoContract]
    public class UserRes : BaseDTO, IComparable
    {
        int IComparable.CompareTo(object obj)
        {
            throw new NotImplementedException();
        }
        [ProtoMember(1)]
        public int UserID { get; set; }
        [ProtoMember(2)]
        public string Username { get; set; }
        [ProtoMember(3)]
        public string Password { get; set; }
        [ProtoMember(4)]
        public string Avatar { get; set; }
        [ProtoMember(5)]
        public string Description { get; set; }
        [ProtoMember(6)]
        public bool? IsAdmin { get; set; }
        [ProtoMember(7)]
        public int? UserTypeID { get; set; }
        [ProtoMember(8)]
        public string UserTypeName { get; set; }
        [ProtoMember(9)]
        public int? SupplierID { get; set; }
        [ProtoMember(10)]
        public string SupplierNo { get; set; }
        [ProtoMember(11)]
        public string SupplierName { get; set; }
        [ProtoMember(12)]
        public string FirstName { get; set; }
        [ProtoMember(13)]
        public string LastName { get; set; }
        [ProtoMember(14)]
        public string FullName { get; set; } = string.Empty;
        [ProtoMember(15)]
        public int? Gender { get; set; }
        [ProtoMember(16)]
        public string Phone { get; set; }
        [ProtoMember(17)]
        public string Email { get; set; } = string.Empty;
        [ProtoMember(18)]
        public string Fax { get; set; }
        [ProtoMember(19)]
        public string Address { get; set; }
        [ProtoMember(20)]
        public int? DepartmentID { get; set; }
        [ProtoMember(21)]
        public string DepartmentName { get; set; }
        [ProtoMember(22)]
        public int? PositionID { get; set; }
        [ProtoMember(23)]
        public string PositionName { get; set; }
        [ProtoMember(24)]
        public bool IsActived { get; set; }
        [ProtoMember(25)]
        public bool IsLocked { get; set; }
        [ProtoMember(26)]
        public int CreatedUser { get; set; }
        [ProtoMember(27)]
        public string CreatedUsername { get; set; }
        [ProtoMember(28)]
        public int EmployeeID { get; set; }
        [ProtoMember(29)]
        public bool IsInit { get; set; }

        [ProtoMember(30)]
        public DateTime? DOB { get; set; }
        [ProtoMember(31)]
        public DateTime? LastChangePassword { get; set; }
        [ProtoMember(32)]
        public DateTime? ActivedDate { get; set; }
        [ProtoMember(33)]
        public DateTime? LockedDate { get; set; }
        [ProtoMember(34)]
        public DateTime CreatedDate { get; set; }


        [ProtoMember(35)]
        public List<UserStoreRes> Stores { get; set; }
        [ProtoMember(36)]
        public List<UserProductCategoryRes> ProductCategorys { get; set; }
    }
}
