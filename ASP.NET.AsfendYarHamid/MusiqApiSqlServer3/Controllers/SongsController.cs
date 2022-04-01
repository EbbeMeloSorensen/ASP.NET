using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusiqApiSqlServer3.Data;
using MusiqApiSqlServer3.Helpers;
using MusiqApiSqlServer3.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MusiqApiSqlServer3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private ApiDbContext _dbContext;

        public SongsController(ApiDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/<SongsController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _dbContext.Songs.ToListAsync());
        }

        // GET api/<SongsController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var song = await _dbContext.Songs.FindAsync(id);

            if (song == null)
            {
                return NotFound("No record found with this id");
            }

            return Ok(song);
        }

        // api/songs/test/1
        [HttpGet("[action]/{id}")]
        public int Test(int id)
        {
            return id;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Song song)
        {
            var imageUrl = await FileHelper.UploadImage(song.Image);
            song.ImageUrl = imageUrl;
            await _dbContext.Songs.AddAsync(song);
            await _dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created);
        }

        // PUT api/<SongsController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Song songObj)
        {
            var song = await _dbContext.Songs.FindAsync(id);

            if (song == null)
            {
                return NotFound("No record found with this id");
            }

            song.Title = songObj.Title;
            song.Language = songObj.Language;
            song.Duration = songObj.Duration;
            await _dbContext.SaveChangesAsync();
            return Ok("Record updated succesfully");
        }

        // DELETE api/<SongsController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var song = await _dbContext.Songs.FindAsync(id);

            if (song == null)
            {
                return NotFound("No record found with this id");
            }

            _dbContext.Songs.Remove(song);
            await _dbContext.SaveChangesAsync();
            return Ok("Record deleted");
        }
    }
}
