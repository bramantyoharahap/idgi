using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace IDGI.WebApi.Models
{
    public class Supplier : IEntity
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string City { get; set; }

    }

    public class Product : IEntity
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }

    }

    public class PurchaseOrder : IEntity
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }
        public string Code { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string SupplierID { get; set; }
        public string Remarks { get; set; }

    }
    public class PurchaseOrderDetail : IEntity
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }
        public string Code { get; set; }
        public string PurchaseOrderID { get; set; }
        public string ProductID { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }

    }
}