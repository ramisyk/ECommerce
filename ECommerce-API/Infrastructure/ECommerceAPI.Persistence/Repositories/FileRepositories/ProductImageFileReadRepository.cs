using System;
using ECommerceAPI.Application.Repositories.FileRepositories;
using ECommerceAPI.Domain.Entities;
using ECommerceAPI.Persistence.Contexts;

namespace ECommerceAPI.Persistence.Repositories.FileRepositories
{
    public class ProductImageFileReadRepository : ReadRepository<ProductImageFile>, IProductImageFileReadRepository
    {
        public ProductImageFileReadRepository(ECommerceAPIDbContext eCommerceAPIDbContext) : base(eCommerceAPIDbContext)
        {
        }
    }
}

