using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicApiPostgreSql.Data;
using MusicApiPostgreSql.Helpers;
using MusicApiPostgreSql.Models;

namespace MusicApiPostgreSql.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumsController : ControllerBase
    {
        private ApiDbContext _dbContext;

        public AlbumsController(ApiDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Album album)
        {
            var imageUrl = await FileHelper.UploadImage(album.Image);
            album.ImageUrl = imageUrl;
            await _dbContext.Albums.AddAsync(album);
            await _dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created);
        }

        // api/albums
        [HttpGet]
        public async Task<IActionResult> GetAlbums(int? pageNumber, int? pageSize)
        {
            var currentPageNumber = pageNumber ?? 1;
            var currentPageSize = pageSize ?? 5;

            // Notice:
            // * We only retrieve specific fields that we need
            // * The property names of the anonymous type are used in the json response
            var albums = await (from album in _dbContext.Albums
                select new
                {
                    Id = album.Id,
                    Name = album.Name,
                    ImageUrl = album.ImageUrl
                }).ToListAsync();

            return Ok(albums.Skip((currentPageNumber - 1) * currentPageSize).Take(currentPageSize));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> AlbumDetails(int albumId)
        {
            // Notice that we also retrieve the songs on the album
            var albumDetails =
                await _dbContext.Albums
                    .Where(a => a.Id == albumId)
                    .Include(a => a.Songs)
                    .ToListAsync();

            return Ok(albumDetails);
        }
    }
}
