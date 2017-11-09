using Core.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VNMuasam.Business.Entities
{
    [Table("UserType", Schema = "USR")]
    public partial class UserType : BaseEntity
    {
        public int UserTypeID { get; set; }

        [StringLength(256)]
        public string UserTypeName { get; set; }

        [StringLength(4000)]
        public string Description { get; set; }

        public DateTime CreatedDate { get; set; }

        public int CreatedUser { get; set; }

        public DateTime UpdatedDate { get; set; }

        public int UpdatedUser { get; set; }

        public bool IsDeleted { get; set; }

        public bool? IsInit { get; set; }
    }
}
