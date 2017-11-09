using Core.DTO;
using FluentValidation;
using FluentValidation.Attributes;
using ProtoBuf;
using System;

namespace VNMuasam.Business.DTO
{
    [Validator(typeof(UserUpdateReqValidator))]
    //[Serializable]
    [ProtoContract]
    public class UserUpdateReq : BaseDTO
    {
        [ProtoMember(1)]
        public int UserID { get; set; }
        [ProtoMember(2)]
        public string Username { get; set; }
        [ProtoMember(3)]
        public string Password { get; set; }
        [ProtoMember(4)]
        public string Avatar { get; set; }
        [ProtoMember(5)]
        public bool? IsAdmin { get; set; }
        [ProtoMember(6)]
        public int? UserTypeID { get; set; }
        [ProtoMember(7)]
        public int? EmployeeID { get; set; }
        [ProtoMember(8)]
        public int? SupplierID { get; set; }
        [ProtoMember(9)]
        public bool IsActived { get; set; }
        [ProtoMember(10)]
        public bool IsLocked { get; set; }
        [ProtoMember(11)]
        public string Email { get; set; }
        [ProtoMember(12)]
        public bool IsDeleted { get; set; }
        [ProtoMember(13)]
        public bool IsInit { get; set; }

        [ProtoMember(14)]
        public DateTime? LastChangePassword { get; set; }
        [ProtoMember(15)]
        public DateTime? ActivedDate { get; set; }
        [ProtoMember(16)]
        public DateTime? LockedDate { get; set; }
    }

    public class UserUpdateReqValidator : AbstractValidator<UserUpdateReq>
    {
        public UserUpdateReqValidator()
        {
            RuleFor(x => x.UserID).NotNull().GreaterThan(0);            
            RuleFor(x => x.Password).NotEmpty().Length(0, 512);
            RuleFor(x => x.Avatar).Length(0, 512);
            RuleFor(x => x.IsAdmin).NotNull();
            RuleFor(x => x.UserTypeID).GreaterThan(0).When(x => x.UserTypeID != null);            
            RuleFor(x => x.IsActived).NotNull();
            RuleFor(x => x.IsLocked).NotNull();
            RuleFor(x => x.IsInit).NotNull();
        }
    }
}
