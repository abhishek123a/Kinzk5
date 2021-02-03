using System.ComponentModel.DataAnnotations;

namespace Kinzk5.Shared.Models
{
    public class LoginModel
    {
        public int RowNumber { get; set; }
        public string SearchText { get; set; }
        public int LoginId { get; set; }

        public string LoginName { get; set; }

        public string LoginPassword { get; set; }
        public string DisplayName { get; set; }
        public string Platform { get; set; }
        public int UserTypeId { get; set; }
        public string UserType { get; set; }

        public int IsActive { get; set; }

        public int DefaultBranchId { get; set; }
        public string DefaultBranch { get; set; }
        public string UserBranches { get; set; }
        public string UserRoles { get; set; }
        public string Token { get; set; }

    }
    //public class LoginModel
    //{
    //    public int RowNumber { get; set; }
    //    public string SearchText { get; set; }
    //    public int LoginId { get; set; }

    //    public string LoginName { get; set; }

    //    public string LoginPassword { get; set; }
    //    public string DisplayName { get; set; }
    //    public string Platform { get; set; }
    //    public int UserTypeId { get; set; }
    //    public string UserType { get; set; }

    //    public int IsActive { get; set; }

    //    public int DefaultBranchId { get; set; }
    //    public string DefaultBranch { get; set; }
    //    public string UserBranches { get; set; }
    //    public string UserRoles { get; set; }
    //    public string Token { get; set; }

    //}

    public class LoginRequest
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }

    public class LoginResult
    {
        public bool Successful { get; set; }
        public string Error { get; set; }
        public string Token { get; set; }
    }

}
