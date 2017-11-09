namespace VNMuasam.Business.Entities
{
    using Core.Entities;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    
    [Table("User_ProductCategory", Schema = "USR")]
    public class UserProductCategory:BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UCID { get; set; }

        public int UserID { get; set; }

        public int CategoryID { get; set; }

        public bool IsCanInput { get; set; }

        public bool IsCanOutput { get; set; }

        public bool IsCanViewReport { get; set; }

        public bool IsCanStoreChangeOrder { get; set; }

        public bool IsCanOutOrder { get; set; }

        public bool IsCanMakingPrice { get; set; }

        public bool IsCanMakingBonusPoint { get; set; }

        public int CreatedUser { get; set; }

        public DateTime CreatedDate { get; set; }

        public int UpdatedUser { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public bool IsDeleted { get; set; }

    }
}
