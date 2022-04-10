 using ECommerceAPI.Application.Abstractions;
using ECommerceAPI.Application.Repositories;
using ECommerceAPI.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IProductReadRepository _productReadRepository;
        private readonly IProductWriteRepository _productWriteRepository;

        public ProductsController(IProductService productService, IProductReadRepository productReadRepository, IProductWriteRepository productWriteRepository)
        {
            _productService = productService;
            _productReadRepository = productReadRepository;
            _productWriteRepository = productWriteRepository;
        }

        [HttpGet]
        public async Task GetProduct()
        {
            //await _productWriteRepository.AddRangeAsync(new()
            //{
            //    new() { Id = Guid.NewGuid(), Name = "Product 1", Price = 100, Stock = 10, CreatedDate = DateTime.UtcNow },
            //    new() { Id = Guid.NewGuid(), Name = "Product 2", Price = 200, Stock = 10, CreatedDate = DateTime.UtcNow },
            //    new() { Id = Guid.NewGuid(), Name = "Product 3", Price = 300, Stock = 10, CreatedDate = DateTime.UtcNow },
            //    new() { Id = Guid.NewGuid(), Name = "Product 4", Price = 400, Stock = 10, CreatedDate = DateTime.UtcNow },
            //    new() { Id = Guid.NewGuid(), Name = "Product 5", Price = 500, Stock = 10, CreatedDate = DateTime.UtcNow }
            //});

            //await _productWriteRepository.SaveAsync();

            Product p = await _productReadRepository.GetByIdAsync("0d7531df-295e-4786-aac3-7ef68283a55f" , false);
            p.Name = "test";
            await _productWriteRepository.SaveAsync();

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            Product product = await _productReadRepository.GetByIdAsync(id);
            return Ok(product);
        }
    }
}
