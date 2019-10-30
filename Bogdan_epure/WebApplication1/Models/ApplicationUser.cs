using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class ApplicationUser : IdentityUser
    {
        [System.ComponentModel.DataAnnotations.StringLength(200)]
        public string Prescription { get; set; }
    }
}
