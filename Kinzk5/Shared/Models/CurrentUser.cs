using System;
using System.Collections.Generic;
using System.Text;

namespace Kinzk5.Shared.Models
{
    public class CurrentUser
    {
        public bool IsAuthenticated { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
        public string UserType { get; set; }
        public string IntUserId { get; set; }
        public Dictionary<string, string> Claims { get; set; }
        public string StrDisplayName { get; set; }
    }
}
