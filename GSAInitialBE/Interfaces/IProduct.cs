using GSAInitialBE.Models;
using System.Collections.Generic;

namespace GSAInitialBE.Interfaces
{
    interface IProduct
    {
        List<Product> GetAllProduct();
        Product GetProduct(int id);
        int AddNewProduct(Product product);
        void EditProduct(Product product);
        void DeleteProduct(int id);
    }
}
