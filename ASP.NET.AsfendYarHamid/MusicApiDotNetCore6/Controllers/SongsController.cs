using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicApiDotNetCore6.Models;

namespace MusicApiDotNetCore6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private static List<Song> songs = new List<Song>()
        {
            new Song
            {
                Id = 0,
                Title = "Willow",
                Language ="English"
            },
            new Song
            {
                Id = 1,
                Title = "After Glow",
                Language ="English"
            }
        };

        [HttpGet]
        public IEnumerable<Song> Get()
        {
            return songs;
        }
    }
}
