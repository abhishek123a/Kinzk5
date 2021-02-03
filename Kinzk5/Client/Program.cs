using Kinzk5.Client.Services;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.Http;
using System.Threading.Tasks;
namespace Kinzk5.Client
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("app");
            builder.Services.AddOptions();
            builder.Services.AddAuthorizationCore();

            // builder.Services.AddScoped<AuthenticationStateProvider, ApiAuthenticationStateProvider>();

            builder.Services.AddScoped<CustomStateProvider>();
            builder.Services.AddScoped<AuthenticationStateProvider>(s => s.GetRequiredService<CustomStateProvider>());
            builder.Services.AddScoped<IAuthService, AuthService>();
          
            //Add Data In localStorage
            builder.Services.AddScoped<ILocalStorageService, LocalStorageService>();
            //----------//

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

            //Local Storage
            //builder.Services.AddTransient(sp => new HttpClient
            //{
            //    BaseAddress = new Uri(builder.HostEnvironment.BaseAddress)
            //})
            //    .AddBlazoredLocalStorage();
            //


            await builder.Build().RunAsync();
        }
    }
}
