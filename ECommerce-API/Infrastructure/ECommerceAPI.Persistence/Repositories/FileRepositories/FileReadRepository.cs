using System;
using ECommerceAPI.Application.Repositories.FileRepositories;
using ECommerceAPI.Persistence.Contexts;

namespace ECommerceAPI.Persistence.Repositories.FileRepositories
{
    public class FileReadRepository : ReadRepository<Domain.Entities.File>, IFileReadRepository
    {
        public FileReadRepository(ECommerceAPIDbContext eCommerceAPIDbContext) : base(eCommerceAPIDbContext)
        {
        }
    }
}

