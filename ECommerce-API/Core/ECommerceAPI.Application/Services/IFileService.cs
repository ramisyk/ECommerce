using System;
using Microsoft.AspNetCore.Http;

namespace ECommerceAPI.Application.Services
{
	public interface IFileService
	{
		Task<List<(string fileName, string path)>> FileUploadAsync(string path, IFormFileCollection files);

		Task<bool> FileCopyAsync(string path, IFormFile file);
	}
}

