using Core.DTO;
using ProtoBuf;
using System;

namespace VNMuasam.Business.DTO
{
    //[Serializable]
    [ProtoContract]
    public class UserTypeRes : BaseDTO, IComparable
    {
        int IComparable.CompareTo(object obj)
        {
            throw new NotImplementedException();
        }
        [ProtoMember(1)]
        public int UserTypeID { get; set; }
        [ProtoMember(2)]
        public string UserTypeName { get; set; }
        [ProtoMember(3)]
        public string Description { get; set; }
        [ProtoMember(4)]
        public int CreatedUser { get; set; }
        [ProtoMember(5)]
        public int UpdatedUser { get; set; }
        [ProtoMember(6)]
        public bool IsDeleted { get; set; }
        [ProtoMember(7)]
        public bool? IsInit { get; set; }

        [ProtoMember(8)]
        public DateTime CreatedDate { get; set; }
        [ProtoMember(9)]
        public DateTime UpdatedDate { get; set; }
    }
}
