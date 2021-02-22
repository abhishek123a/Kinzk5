using Kinzk5.Client.Services;
using Kinzk5.Shared.Models;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kinzk5.Client.Pages.Authentication
{
    public class LoginBase : ComponentBase
    {
        public LoginRequest loginModel { get; set; } = new LoginRequest();
        [Inject]
        private CustomStateProvider authStateProvider { get; set; }

        [Inject]
        NavigationManager navigationManager { get; set; }
        /*protected override async Task OnInitializedAsync()
        {
            await Task.Run();
            //return base.OnInitializedAsync();
        }
        */
        public string error { get; set; }
        bool IsTaskRunning = false;
        public async Task OnSubmit()
        {
            IsTaskRunning = true;
            error = null;
            try
            {
                await authStateProvider.Login(loginModel);
                //var pp = await authStateProvider.CurrentUserInfo();
                navigationManager.NavigateTo("/");
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
        }
    }
}
