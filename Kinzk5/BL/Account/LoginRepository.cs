using Dapper;
using Kinzk5.Shared.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Kinzk5.Bl.Account
{
    public class LoginRepository:ILoginRepository
    {
        private  IConfiguration _configuration;
        public LoginRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<LoginModel> ValidateLogin(string username, string password, string platform)
        {
         
            LoginModel model = new LoginModel();
            const string PROC_NAME = "p_user";
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("connStr")))
            {
                sqlConnection.Open();
                var dp = new DynamicParameters();
                dp.Add("@ModeSql", "ValidateLogin");
                dp.Add("@LoginName", username);
                dp.Add("@LoginPassword", password);
                dp.Add("@Platform", platform);
                // var result = sqlConnection.QuerySingleOrDefault<Login>(PROC_NAME, dp, commandType: CommandType.StoredProcedure);

                var result = await sqlConnection.QuerySingleOrDefaultAsync<dynamic>(PROC_NAME, dp, commandType: CommandType.StoredProcedure);

                model.LoginName = result.LoginName;
                model.LoginId = result.LoginId;
                model.UserRoles = result.UserType;
                model.LoginName = result.LoginName;
                //model.UserTypeId = result.UserTypeId;
                //model.to = "";

                return model;
                // return null;
            }
            //  return null;
        }

        public async Task<LoginModel> AuthenticateAsync(string username, string password, string platform)
        {
            const string PROC_NAME = "pl_user";
            LoginModel objLmodel = new LoginModel();
        
            try
            {

                using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("connStr")))
                {
                    sqlConnection.Open();
                    var dp = new DynamicParameters();
                    dp.Add("@modeSql", "ValidateLogin");
                    dp.Add("@user_name", username);
                    dp.Add("@password", password);
                    dp.Add("@platform", platform);
                   var result = await sqlConnection.QuerySingleOrDefaultAsync<dynamic>(PROC_NAME, dp, commandType: CommandType.StoredProcedure);
                    // return null if user not found
                    if (result == null)
                        return null;

                    objLmodel.DisplayName = result.first_name + ' ' + result.last_name;
                    objLmodel.LoginName = result.user_name;
                    objLmodel.LoginId = result.recordID;
                    objLmodel.UserRoles = result.type;
                    objLmodel.UserType = result.type;

                    var securitukey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSecurityKey"]));
                    var credentials = new SigningCredentials(securitukey, SecurityAlgorithms.HmacSha256);

                    var clamims = new[]
                    {
                   
                    new Claim(ClaimTypes.Name,objLmodel.DisplayName.ToString()),
                    new Claim(ClaimTypes.Role, objLmodel.UserRoles),
                    new Claim("LoginId", objLmodel.LoginId.ToString()),
                    new Claim("LoginName", objLmodel.LoginName),
                   // new Claim("DispalyName", objLmodel.StrDisplayName)
                };

                    var token = new JwtSecurityToken(
                        issuer: _configuration["JwtIssuer"],
                        audience: _configuration["JwtAudience"],
                        clamims,
                        expires: DateTime.UtcNow.AddDays(20),
                        signingCredentials: credentials
                        );
                    var encodedtoken = new JwtSecurityTokenHandler().WriteToken(token);

                    objLmodel.Token = encodedtoken;
                  

                    return objLmodel;
                }
            }
            catch (Exception ex)
            {
                return objLmodel;
            }
        }
    }
}
