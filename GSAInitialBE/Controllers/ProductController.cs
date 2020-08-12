using GSAInitialBE.Models;
using GSAInitialBE.Repositories;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace GSAInitialBE.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProductController : ApiController
    {
        private ProductRepository _productRepository;
        public ProductController()
        {
            _productRepository = new ProductRepository();
        }

        [HttpGet]
        [Route("api/GetAllProduct")]
        [AllowAnonymous]
        public IHttpActionResult GetAllProduct()
        {
            List<Models.Product> getAllProduct = _productRepository.GetAllProduct();
            return Ok(new { products = getAllProduct });
        }

        [HttpGet]
        [Route("api/GetProduct/{id}")]
        public IHttpActionResult GetAllProduct(int id)
        {
            Product product= _productRepository.GetProduct(id);
            return Ok(new { product });
        }

        [HttpPost]
        [Route("api/AddNewProduct")]
        public IHttpActionResult AddNewProduct(Product product)
        {
            int id = _productRepository.AddNewProduct(product);
            return Ok(new { id });
        }

        [HttpPut]
        [Route("api/EditProduct")]
        public IHttpActionResult EditProduct(Product product)
        {
            _productRepository.EditProduct(product);
            return Ok();
        }

        [HttpDelete]
        [Route("api/DeleteProduct/{id}")]
        public IHttpActionResult DeleteProduct(int id)
        {
            _productRepository.DeleteProduct(id);
            return Ok();
        }
    }
}
