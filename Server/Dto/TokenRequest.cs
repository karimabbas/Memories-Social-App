using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Dto
{
    public class TokenRequest
    {
        [Required]
        public string? Token { get; set; }
        [Required]
        public string? RefreshToken { get; set; }

    }
}