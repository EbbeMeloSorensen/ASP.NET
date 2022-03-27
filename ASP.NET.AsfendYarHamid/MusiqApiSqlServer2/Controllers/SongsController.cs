using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusiqApiSqlServer2.Data;
using MusiqApiSqlServer2.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MusiqApiSqlServer2.Controllers
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
        //public IActionResult Get() // Before, where the method wasn't asynchronous
        public async Task<IActionResult> Get()
        {
            //return _dbContext.Songs; // Original, when the method returned an IEnumerable<Song>
            //return NotFound(); // We could do like this
            //return BadRequest(); // We could also do like this
            //return StatusCode(400); // We could also do like this
            //return StatusCode(StatusCodes.Status400BadRequest); // Similar to the previous, but using a type from the framework
            //return Ok(_dbContext.Songs); // Proper way, where http code 200 is returned explicitly along with the songs
            return Ok(_dbContext.Songs.ToListAsync()); // asynchronously
        }

        // GET api/<SongsController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var song = _dbContext.Songs.FindAsync(id);

            if (song == null)
            {
                return NotFound("No record found with this id");
            }

            return Ok(song);
        }

        // POST api/<SongsController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Song song)
        {
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
            await _dbContext.SaveChangesAsync();
            return Ok("Record updated succesfully"); // Optionally, we can return a message with the code
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
