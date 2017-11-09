using Core.DTO;
using FluentValidation;
using FluentValidation.Attributes;
using ProtoBuf;
using System;

namespace VNMuasam.Business.DTO
{
    [Validator(typeof(UserStoreUpdateReqValidator))]
    //[Serializable]
    [ProtoContract]
    public class UserStoreUpdateReq:BaseDTO
    {
        [ProtoMember(1)]
        public int UserStoreID { get; set; }
        [ProtoMember(2)]
        public int UserID { get; set; }
        [ProtoMember(3)]
        public int StoreID { get; set; }
        [ProtoMember(4)]
        public bool IsDefaultStore { get; set; }
        [ProtoMember(5)]
        public bool IsCanInput { get; set; }
        [ProtoMember(6)]
        public bool IsCanOutput { get; set; }
        [ProtoMember(7)]
        public bool IsCanViewReport { get; set; }
        [ProtoMember(8)]
        public bool IsCanStoreChangeOrder { get; set; }
        [ProtoMember(9)]
        public bool IsCanOutOrder { get; set; }
        [ProtoMember(10)]
        public int CreatedUser { get; set; }
        [ProtoMember(11)]
        public int UpdatedUser { get; set; }
        [ProtoMember(12)]
        public bool IsDeleted { get; set; }

        
        [ProtoMember(13)]
        public DateTime CreatedDate { get; set; }
        [ProtoMember(14)]
        public DateTime? UpdatedDate { get; set; }
    }
    public class UserStoreUpdateReqValidator : AbstractValidator<UserStoreUpdateReq>
    {
        public UserStoreUpdateReqValidator()
        {
            RuleFor(x => x.UserStoreID).NotNull().GreaterThan(0);
            RuleFor(x => x.UserID).NotNull();
            RuleFor(x => x.StoreID).NotNull();
            RuleFor(x => x.IsDefaultStore).NotNull();
            RuleFor(x => x.IsCanInput).NotNull();
            RuleFor(x => x.IsCanOutput).NotNull();
            RuleFor(x => x.IsCanViewReport).NotNull();
            RuleFor(x => x.IsCanStoreChangeOrder).NotNull();
            RuleFor(x => x.IsCanOutOrder).NotNull();
            RuleFor(x => x.IsDeleted).NotNull();
        }
    }
}
