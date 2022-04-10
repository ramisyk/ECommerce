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

        public IQueryable<T> GetAll(bool tracking = true)
        {
            var query = Table.AsQueryable();
            if (!tracking)
                query = query.AsNoTracking();
            
            return query;
        }

        public IQueryable<T> GetWhere(Expression<Func<T, bool>> filter, bool tracking = true)
        {
            var query = Table.Where(filter);
            if (!tracking)
                query.AsNoTracking();

            return query;
        }
           

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> filter, bool tracking = true)
        {
            
            var query = Table.AsQueryable();
            if (!tracking)
                query = query.AsNoTracking();

            return await query.FirstOrDefaultAsync(filter);
        }

        public async Task<T> GetByIdAsync(string id, bool tracking = true)
        {

            var query = Table.AsQueryable();
            if (!tracking)
                query = query.AsNoTracking();

            return await query.FirstOrDefaultAsync(entity => entity.Id == Guid.Parse(id));
        }
            //=> await Table.SingleOrDefaultAsync(entity => entity.Id == Guid.Parse(id));
    }
}

