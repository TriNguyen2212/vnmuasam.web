using Core.DTO;
using ProtoBuf;
using System;
using System.Collections.Generic;

namespace VNMuasam.Business.DTO
{
    //[Serializable]
    [ProtoContract]
    public class UserStoreRes : BaseDTO, IComparable
    {
        int IComparable.CompareTo(object obj)
        {
            throw new NotImplementedException();
        }
        [ProtoMember(1)]
        public int UserStoreID { get; set; }
        [ProtoMember(2)]
        public int UserID { get; set; }
        [ProtoMember(3)]
        public string Username { get; set; }
        [ProtoMember(4)]
        public int StoreID { get; set; }
        [ProtoMember(5)]
        public bool IsDefaultStore { get; set; }
        [ProtoMember(6)]
        public bool IsCanInput { get; set; }
        [ProtoMember(7)]
        public bool IsCanOutput { get; set; }
        [ProtoMember(8)]
        public bool IsCanViewReport { get; set; }
        [ProtoMember(9)]
        public bool IsCanStoreChangeOrder { get; set; }
        [ProtoMember(10)]
        public bool IsCanOutOrder { get; set; }
        [ProtoMember(11)]
        public int StoreGroupID { get; set; }
        [ProtoMember(12)]
        public string StoreGroupName { get; set; }
        [ProtoMember(13)]
        public string StoreName { get; set; }

    }
}
