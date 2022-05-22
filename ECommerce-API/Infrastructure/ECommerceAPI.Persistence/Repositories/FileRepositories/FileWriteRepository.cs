using System;
using ECommerceAPI.Application.Repositories.FileRepositories;
using ECommerceAPI.Persistence.Contexts;

namespace ECommerceAPI.Persistence.Repositories.FileRepositories
{
    public class FileWriteRepository : WriteRepository<Domain.Entities.File>, IFileWriteRepository
    {
        public FileWriteRepository(ECommerceAPIDbContext eCommerceAPIDbContext) : base(eCommerceAPIDbContext)
        {
        }
    }
}

