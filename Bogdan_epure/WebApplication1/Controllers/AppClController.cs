using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
//using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class AppCl : Controller
    {

        private RoleManager<IdentityRole> roleManager;
        private UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        private string userId;

        public AppCl(
            RoleManager<IdentityRole> _roleManager, 
            UserManager<ApplicationUser> _userManager, 
            IHttpContextAccessor httpContextAccessor,
            SignInManager<ApplicationUser> signInManager
            )
        {
            this.roleManager = _roleManager;
            this.userManager = _userManager;
            this._signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;

        }

        [HttpPost]
        [Route("CreateRole")]
        public async Task<IActionResult> CreateRole([Required]string role)
        {
            if (ModelState.IsValid)
            {
                IdentityResult result = await roleManager.CreateAsync(new IdentityRole(role));
                if (result.Succeeded)
                {
                    return Ok(result);
                }
                else
                {
                    return BadRequest(result);
                }
            }
            return BadRequest(new StatusCodeResult(404));
        }

        [HttpGet]
        [Route("getUserRole")]
        public async Task<IActionResult> GetUserRole([Required] string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            var result = await this.userManager.GetRolesAsync(user);
            return Ok(result);
        }

        [HttpPost]
        [Route("assignRoleToUser")]
        public async Task<IActionResult> AssignUserRole([Required] string userRole, [Required] string email)
        {
            var user = await userManager.GetUserAsync(User);
            var user32 =  this._signInManager.IsSignedIn(User);
            var user1 = await userManager.GetUserAsync(HttpContext.User);

            var last = userManager.FindByEmailAsync(email);

            if (ModelState.IsValid)
            {
                var res = await userManager.AddToRoleAsync(last.Result, userRole);
                if (res.Succeeded)
                {
                    return Ok(res);
                }
            }
            return BadRequest("Error on creating user role");
        }

        [HttpGet]
        [Route("getAllPatients")]
        public async Task<IActionResult> GetAllUsers()
        {
            var res = await this.userManager.GetUsersInRoleAsync("patient");
            return Ok(res);
        }

        [HttpPost]
        [Route("deletePatient")]
        public async Task<IActionResult> DeletePatient([Required] string userId)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            var res = await this.userManager.DeleteAsync(user);
            return Ok(res);
        }

        [HttpPost]
        [Route("presPatient")]
        public async Task<IActionResult> PresPatient([Required] string userId, [Required]string presc)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            user.Prescription = presc;
            var res = await this.userManager.UpdateAsync(user);//.(user);
            return Ok(res);
        }

        
        [HttpGet]
        [Route("getPrescription")]
        public async Task<IActionResult> GetPrescription([Required] string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            var result = await this.userManager.FindByEmailAsync(email);//GetRolesAsync(user);
            return Ok(result);
        }

        [HttpPost]
        [Route("createUser")]
        public async Task<IActionResult> CreatUser()
        {
            var res = await userManager.CreateAsync(null, "password");
            return null;
        }
    }
}