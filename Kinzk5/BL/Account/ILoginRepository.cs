using Kinzk5.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Kinzk5.Bl.Account
{
   public interface ILoginRepository
    {
        Task<LoginModel> ValidateLogin(string username, string password, string platform);

        Task<LoginModel> AuthenticateAsync(string username, string password, string platform);
    }
}
