using Kinzk5.Bl.Account;
using Kinzk5.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Kinzk5.Server.Controllers
{
    //[Route("[controller]")]
    [Route("api/[controller]/[action]")]

    [ApiController]
    public class AuthController : ControllerBase
    {
        private ILoginRepository _loginService;
      
        public AuthController(ILoginRepository loginRepository)
        {
            _loginService = loginRepository;
           // _configuration = configuration;
        }
        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest request)
        {


            //var abd = await _loginService.ValidateLogin(request.UserName, request.Password, "platform");
            var abd = await _loginService.AuthenticateAsync(request.UserName, request.Password, "platform");
            if (abd ==null)
                return BadRequest("User does not exist");
            //throw new HttpRequestException("User does not exist");
            else
              //  await _Ilocalstorege.SetItemAsync(cust.CustomerId, cust);
           
                return Ok(abd);
        }


        //[HttpPost]
        //public async Task<IActionResult> Login([FromBody] LoginModel login)
        //{
        //    var result = await _loginService.ValidateLogin(login.LoginName, login.LoginPassword, "platform"); ;
        //    if (result.LoginId!=0) return BadRequest(new LoginResult { Successful = false, Error = "Username and password are invalid." });

        //    var claims = new[]
        //    {
        //        new Claim(ClaimTypes.Name, result.LoginName)
        //    };

        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSecurityKey"]));
        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        //    var expiry = DateTime.Now.AddDays(Convert.ToInt32(_configuration["JwtExpiryInDays"]));

        //    var token = new JwtSecurityToken(
        //        _configuration["JwtIssuer"],
        //        _configuration["JwtAudience"],
        //        claims,
        //        expires: expiry,
        //        signingCredentials: creds
        //    );

        //    return Ok(new LoginResult { Successful = true, Token = new JwtSecurityTokenHandler().WriteToken(token) });
        //}

        [Authorize]
        [HttpGet]
        public CurrentUser CurrentUserInfo()
        {
            return new CurrentUser
            {
                IsAuthenticated = User.Identity.IsAuthenticated,
                UserName = User.Identity.Name,
                IntUserId= User.FindAll("LoginId").First().Value,
                Claims = User.Claims
                .ToDictionary(c => c.Type, c => c.Value)
            };
         
        }

        //[Authorize]
        //[HttpGet]
        //[Route("api/values/getvalues")]
        //public IHttpActionResult GetValues()
        //{
        //    //var token=  result.Headers.GetValues("access-token").FirstOrDefault();
        //    //string value = HttpRequestHeaders.Headers["Authorization"].

        //    System.Net.Http.Headers.HttpRequestHeaders headers = this.Request.Headers;
        //    var tokentt = headers.GetValues("Authorization").FirstOrDefault();

        //    var identity = (ClaimsIdentity)User.Identity;
        //    var roles = identity.Claims
        //                .Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value);


        //    var userid = identity.FindFirst("UserId").Value;

        //    var UserName = identity.FindFirst("Username").Value;
        //    //return Ok("Hello: " + identity.Name + ", " +
        //    //    "Your Role(s) are: " + string.Join(",", roles.ToList()) +
        //    //    "Your Login time is :" + LogTime);

        //    return Ok(new { RoleName = roles, Username = UserName, Userid = userid, Token = tokentt });
        //}


    }
}
