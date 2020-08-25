using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GSAInitialBE.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public int Purchased { get; set; }
        public int InStock { get; set; }
        public int Sold { get; set; }
        public int Damaged { get; set; }    
    }
}