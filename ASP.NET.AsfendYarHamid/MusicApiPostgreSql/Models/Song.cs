﻿using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace MusicApiPostgreSql.Models
{
    public class Song
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Duration { get; set; }
        public DateTime UploadedDate { get; set; }
        public bool IsFeatured { get; set; }
        [NotMapped]
        public IFormFile Image { get; set; }
        public string ImageUrl { get; set; }
        [NotMapped]
        public IFormFile AudioFile { get; set; }
        public string AudioUrl { get; set; }
        public int ArtistId { get; set; }
        public int? AlbumId { get; set; } // Notice that this relation is optional, since a song may not be on an album
    }
}
