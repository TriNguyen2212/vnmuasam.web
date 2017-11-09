using Core.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VNMuasam.Business.Entities
{
    [Table("User", Schema = "USR")]
    public class User: BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Avatar { get; set; }
        public bool? IsAdmin { get; set; }
        public int? UserTypeID { get; set; }
        public int? EmployeeID { get; set; }
        public int? SupplierID { get; set; }
        public DateTime? LastChangePassword { get; set; }
        public bool IsActived { get; set; }
        public DateTime? ActivedDate { get; set; }
        public bool IsLocked { get; set; }
        public DateTime? LockedDate { get; set; }
        public int? CreatedUser { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedUser { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsInit { get; set; }
    }
}
