using System;
using System.Linq.Expressions;
using ECommerceAPI.Application.Repositories;
using ECommerceAPI.Domain.Entities.Common;
using ECommerceAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Persistence.Repositories
{
    public class ReadRepository<T> : IReadRepository<T> where T : BaseEntity
    {
        private readonly ECommerceAPIDbContext _eCommerceAPIDbContext;

        public ReadRepository(ECommerceAPIDbContext eCommerceAPIDbContext)
        {
            _eCommerceAPIDbContext = eCommerceAPIDbContext;
        }

        public DbSet<T> Table => _eCommerceAPIDbContext.Set<T>();

        public IQueryable<T> GetAll()
            => Table;

        public IQueryable<T> GetWhere(Expression<Func<T, bool>> filter)
            => Table.Where(filter);

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> filter)
            => await Table.FirstOrDefaultAsync(filter);

        public async Task<T> GetByIdAsync(string id)
            => await Table.SingleOrDefaultAsync(entity => entity.Id == Guid.Parse(id));
    }
}

