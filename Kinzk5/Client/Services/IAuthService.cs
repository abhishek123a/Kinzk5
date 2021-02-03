using Kinzk5.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kinzk5.Client.Services
{
    public interface IAuthService
    {
        Task  Login(LoginRequest loginRequest);
        //Task<LoginResult> Login(LoginModel loginModel);
        //Task<LoginResult> Login(LoginModel loginModel);
        //Task Register(RegisterRequest registerRequest);
        // Task Logout();
        Task<CurrentUser> CurrentUserInfo();
    }
}
