using System;
using ECommerceAPI.Application.Repositories.FileRepositories;
using ECommerceAPI.Domain.Entities;
using ECommerceAPI.Persistence.Contexts;

namespace ECommerceAPI.Persistence.Repositories.FileRepositories
{
    public class InvoiceFileReadRepository : ReadRepository<InvoiceFile>, IInvoiceFileReadRepository
    {
        public InvoiceFileReadRepository(ECommerceAPIDbContext eCommerceAPIDbContext) : base(eCommerceAPIDbContext)
        {
        }
    }
}

