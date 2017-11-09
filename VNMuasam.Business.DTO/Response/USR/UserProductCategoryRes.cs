using Core.DTO;
using ProtoBuf;
using System;

namespace VNMuasam.Business.DTO
{
    //[Serializable]
    [ProtoContract]
    public class UserProductCategoryRes : BaseDTO, IComparable
    {
        int IComparable.CompareTo(object obj)
        {
            throw new NotImplementedException();
        }
        [ProtoMember(1)]
        public int UCID { get; set; }
        [ProtoMember(2)]
        public int UserID { get; set; }
        [ProtoMember(3)]
        public int CategoryID { get; set; }
        [ProtoMember(4)]
        public int ParentCategoryID { get; set; }
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
        public bool IsCanMakingPrice { get; set; }
        [ProtoMember(11)]
        public bool IsCanMakingBonusPoint { get; set; }
        [ProtoMember(12)]
        public string CategoryName { get; set; }
        [ProtoMember(13)]
        public bool IsActived { get; set; }
        //public string ChildCategoryID { get; set; }
        //public string ChildCategoryName { get; set; }
    }
}
