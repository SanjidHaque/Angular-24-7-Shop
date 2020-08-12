using GSAInitialBE.DataLayers;
using GSAInitialBE.Interfaces;
using GSAInitialBE.Models;
using System.Collections.Generic;

namespace GSAInitialBE.Repositories
{
    public class ProductRepository : IProduct
    {
        private ProductDataAccessLayer _productDataAccessLayer;

        public ProductRepository()
        {
            _productDataAccessLayer = new ProductDataAccessLayer();
        }
        public List<Product> GetAllProduct()
        {
            return  _productDataAccessLayer.GetAllProduct();
        }

        public Product GetProduct(int id)
        {
            return _productDataAccessLayer.GetProduct(id);
        }

        public int AddNewProduct(Product product)
        {
            return _productDataAccessLayer.AddNewProduct(product);
        }

        public void EditProduct(Product product)
        {
            _productDataAccessLayer.EditProduct(product);
        }

        public void DeleteProduct(int id)
        {
            _productDataAccessLayer.DeleteProduct(id);
        }
    }
}