using System;
using ECommerceAPI.Application.Repositories;
using ECommerceAPI.Domain.Entities.Common;
using ECommerceAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace ECommerceAPI.Persistence.Repositories
{
    public class WriteRepository<T> : IWriteRepository<T> where T : BaseEntity
    {
        private readonly ECommerceAPIDbContext _eCommerceAPIDbContext;

        public WriteRepository(ECommerceAPIDbContext eCommerceAPIDbContext)
        {
            _eCommerceAPIDbContext = eCommerceAPIDbContext;
        }

        public DbSet<T> Table => _eCommerceAPIDbContext.Set<T>();

        public async Task<bool> AddAsync(T entity)
        {
            EntityEntry<T> entityEntry = await Table.AddAsync(entity);
            return entityEntry.State == EntityState.Added;
        }

        public async Task<bool> AddRangeAsync(List<T> entities)
        {
            Table.AddRangeAsync(entities);
            return true;
        }

        public bool Remove(T entity)
        {
            EntityEntry<T> entityEntry = Table.Remove(entity);
            return entityEntry.State == EntityState.Deleted;
        }

        public async Task<bool> RemoveAsync(string id)
        {
            T removedEntity = await Table.FirstOrDefaultAsync(entity => entity.Id == Guid.Parse(id));
            return Remove(removedEntity);
        }
        public bool RemoveRange(List<T> entities)
        {
            Table.RemoveRange(entities);
            //return entityEntry.State == EntityState.Deleted;
            return true;
        }

        public bool Update(T entity)
        {
            EntityEntry<T> entityEntry = Table.Update(entity);
            return entityEntry.State == EntityState.Modified;
        }

        public async Task<int> SaveAsync()
            => await _eCommerceAPIDbContext.SaveChangesAsync();

        
    }
}

