using Core.DTO;
using FluentValidation;
using FluentValidation.Attributes;
using ProtoBuf;
using System;

namespace VNMuasam.Business.DTO
{
    //[Serializable]
    [ProtoContract]
    public class UserProductCategoryUpdateReq : BaseDTO
    {
        [ProtoMember(1)]
        public int UCID { get; set; }
        [ProtoMember(2)]
        public int UserID { get; set; }
        [ProtoMember(3)]
        public int CategoryID { get; set; }
        [ProtoMember(4)]
        public bool IsCanInput { get; set; }
        [ProtoMember(5)]
        public bool IsCanOutput { get; set; }
        [ProtoMember(6)]
        public bool IsCanViewReport { get; set; }
        [ProtoMember(7)]
        public bool IsCanStoreChangeOrder { get; set; }
        [ProtoMember(8)]
        public bool IsCanOutOrder { get; set; }
        [ProtoMember(9)]
        public bool IsCanMakingPrice { get; set; }
        [ProtoMember(10)]
        public bool IsCanMakingBonusPoint { get; set; }
        [ProtoMember(11)]
        public int CreatedUser { get; set; }
        [ProtoMember(12)]
        public int UpdatedUser { get; set; }
        [ProtoMember(13)]
        public bool IsDeleted { get; set; }

        [ProtoMember(14)]
        public DateTime CreatedDate { get; set; }
        [ProtoMember(15)]
        public DateTime? UpdatedDate { get; set; }
    }
}
