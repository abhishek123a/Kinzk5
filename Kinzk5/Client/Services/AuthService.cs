
using Kinzk5.Shared.Models;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace Kinzk5.Client.Services
{
    public class AuthService:IAuthService
    {
        private readonly HttpClient _httpClient;
        private ILocalStorageService _localStorageService;
       
        public AuthService(HttpClient httpClient, ILocalStorageService localStorageService)
        {
            _httpClient = httpClient;
            _localStorageService = localStorageService;
        }
        public async Task  Login(LoginRequest loginRequest)
        {
            
            var result = await _httpClient.PostAsJsonAsync("api/auth/login", loginRequest);
           

            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var jsonString = await result.Content.ReadAsStringAsync();
                var model = JsonConvert.DeserializeObject<LoginModel>(jsonString);
                await _localStorageService.SetItem("authToken", model.Token);
            }

         
            if (result.StatusCode == System.Net.HttpStatusCode.BadRequest) throw new Exception(await result.Content.ReadAsStringAsync());
            result.EnsureSuccessStatusCode();
        }


        public async Task<CurrentUser> CurrentUserInfo()
        {
            var result = await _httpClient.GetFromJsonAsync<CurrentUser>("api/auth/currentuserinfo");
            return result;
        }
    }
}
