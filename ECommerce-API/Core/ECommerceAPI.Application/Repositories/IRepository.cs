using System;
using ECommerceAPI.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Application.Repositories
{
	//sorgulama ve manipülasyon yapan komutlar arynı sınıfta olduğu için SOLIDe aykırı
	//Query ve command ler ayrılırsa SOLIDe yaklaşmış olur.


	//Temel Komutları Tutar
	//Tüm repositorylerde olması gerekenler burada tutulur
	public interface IRepository<T> where T : BaseEntity
	{
		DbSet<T> Table { get; }
	}
}

