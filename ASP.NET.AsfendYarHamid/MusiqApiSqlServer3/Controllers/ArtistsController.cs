using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusiqApiSqlServer3.Data;
using MusiqApiSqlServer3.Helpers;
using MusiqApiSqlServer3.Models;

namespace MusiqApiSqlServer3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistsController : ControllerBase
    {
        private ApiDbContext _dbContext;

        public ArtistsController(ApiDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Artist artist)
        {
            var imageUrl = await FileHelper.UploadImage(artist.Image);
            artist.ImageUrl = imageUrl;
            await _dbContext.Artists.AddAsync(artist);
            await _dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created);
        }

        // api/artists
        [HttpGet]
        public async Task<IActionResult> GetArtists()
        {
            // Notice:
            // * We only retrieve specific fields that we need
            // * The property names of the anonymous type are used in the json response
            var artists = await (from artist in _dbContext.Artists
                select new
                {
                    Id = artist.Id,
                    Name = artist.Name,
                    ImageUrl = artist.ImageUrl
                }).ToListAsync();

            return Ok(artists);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> ArtistDetails(int artistId)
        {
            // Notice that we also retrieve the songs written by the artist
            var artistDetails = 
                await _dbContext.Artists
                    .Where(a => a.Id == artistId)
                    .Include(a => a.Songs)
                    .ToListAsync();

            return Ok(artistDetails);
        }
    }
}
