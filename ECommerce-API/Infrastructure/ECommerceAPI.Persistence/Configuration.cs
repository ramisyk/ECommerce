using System;
using Microsoft.Extensions.Configuration;

namespace ECommerceAPI.Persistence
{
	static class Configuration
	{
		public static string ConnectionString
        {
			get
            {
                ConfigurationManager configurationManager = new();
                configurationManager.SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../../Presentation/ECommerceAPI.WebAPI"));
                configurationManager.AddJsonFile("appsettings.json");

                return configurationManager.GetConnectionString("PostgreSQL");
            }
        }
	}
}

