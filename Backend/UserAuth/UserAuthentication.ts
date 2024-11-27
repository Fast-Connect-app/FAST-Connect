class UserAuthentication{
    public static Instance:UserAuthentication;

    constructor(){
        if(UserAuthentication.Instance == null)
            UserAuthentication.Instance = this;
    }

    
}