using System.IO;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;

namespace MusicApiPostgreSql.Helpers
{
    public static class FileHelper
    {
        public static async Task<string> UploadImage(IFormFile file)
        {
            var connectionString =
                "DefaultEndpointsProtocol=https;AccountName=ebbesmusicstorage;AccountKey=YG/sTSmTnb2OQ1OcEEMiz8iRe2RZlj6uy1jLGZVD77oQ744E6mbztkxIgQB+40ywGMoPe8r41bGy+ASt85TQFQ==;EndpointSuffix=core.windows.net";

            var containerName = "songscover";

            var blobContainerClient = new BlobContainerClient(connectionString, containerName);
            var blobClient = blobContainerClient.GetBlobClient(file.FileName);
            var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            memoryStream.Position = 0;
            await blobClient.UploadAsync(memoryStream);
            return blobClient.Uri.AbsoluteUri;
        }

        public static async Task<string> UploadFile(IFormFile file)
        {
            var connectionString =
                "DefaultEndpointsProtocol=https;AccountName=ebbesmusicstorage;AccountKey=YG/sTSmTnb2OQ1OcEEMiz8iRe2RZlj6uy1jLGZVD77oQ744E6mbztkxIgQB+40ywGMoPe8r41bGy+ASt85TQFQ==;EndpointSuffix=core.windows.net";

            var containerName = "audiofiles";

            var blobContainerClient = new BlobContainerClient(connectionString, containerName);
            var blobClient = blobContainerClient.GetBlobClient(file.FileName);
            var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            memoryStream.Position = 0;
            await blobClient.UploadAsync(memoryStream);
            return blobClient.Uri.AbsoluteUri;
        }
    }
}

