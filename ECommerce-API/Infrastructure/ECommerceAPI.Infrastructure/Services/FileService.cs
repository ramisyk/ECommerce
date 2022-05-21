﻿using System;
using ECommerceAPI.Application.Services;
using ECommerceAPI.Infrastructure.Operations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace ECommerceAPI.Infrastructure.Services
{
    public class FileService : IFileService
    {
        readonly IWebHostEnvironment _webHostEnvironment;

        public FileService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<bool> FileCopyAsync(string path, IFormFile file)
        {
            try
            {
                await using FileStream fileStream = new(path, FileMode.Create, FileAccess.Write, FileShare.None, 1024 * 1024, useAsync: false);
                await file.CopyToAsync(fileStream);
                await fileStream.FlushAsync();

                return true;
            }
            catch (Exception ex)
            {
                //todo log;
                throw ex;
            }
        }

        private async Task<string> FileRenameAsync(string path, string fileName, bool first = true)
        {
            string newFileName = await Task.Run<string>(async () =>
            {
                string extention = Path.GetExtension(fileName);
                string newFileName = string.Empty;

                if (first)
                {
                    string oldName = Path.GetFileNameWithoutExtension(fileName);
                    newFileName = $"{NameOperations.CharacterRegulatory(oldName)}{extention}";
                }
                else
                {
                    newFileName = fileName;
                    int indexNo1 = newFileName.IndexOf('-');
                    if (indexNo1 == -1)
                    {
                        newFileName = $"{Path.GetFileNameWithoutExtension(newFileName)}-2{extention}";
                    }
                    else
                    {
                        int lastIndex = 0;
                        while (true)
                        {
                            lastIndex = indexNo1;
                            indexNo1 = newFileName.IndexOf("-", indexNo1 +1);
                            if (indexNo1 == -1)
                            {
                                indexNo1 = lastIndex;
                                break;
                            }
                        }
                        int indexNo2 = newFileName.IndexOf('.');
                        string fileNo = newFileName.Substring(indexNo1+1, indexNo2 - indexNo1-1);
                        if (int.TryParse(fileNo, out int _fileNo))
                        {
                            _fileNo++;
                            newFileName = newFileName.Remove(indexNo1+1, indexNo2 - indexNo1 - 1)
                                                 .Insert(indexNo1+1, _fileNo.ToString());
                        }
                        else
                        {
                            newFileName = $"{Path.GetFileNameWithoutExtension(newFileName)}-2{extention}";
                        }

                        // mvc-.txt
                        // 012345
                    }
                }

                if (File.Exists($"{path}\\{newFileName}"))
                {
                    return await FileRenameAsync(path, newFileName, false);
                }
                else
                {
                    return newFileName;
                }
            });

            return newFileName;
        }

        public async Task<List<(string fileName, string path)>> FileUploadAsync(string path, IFormFileCollection files)
        {
            string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, path);

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            List<bool> results = new();
            List<(string fileName, string path)> datas = new();

            foreach (IFormFile file in files)
            {
                string fileNewName = await FileRenameAsync(uploadPath, file.FileName);
                bool result = await FileCopyAsync($"{uploadPath}\\{fileNewName}", file);

                datas.Add((fileNewName, $"{uploadPath}\\{fileNewName}"));
                results.Add(result);
            }

            if (results.TrueForAll(r => r.Equals(true)))
            {
                return datas;
            }
            return null;
            //todo throw information to user when get an error during upload data
        }
    }
}

