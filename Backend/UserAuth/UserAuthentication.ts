import {auth} from "../FirebaseApp"

let isUserSignedIn:boolean = false;

auth.onAuthStateChanged(user=>{
    isUserSignedIn = user != null;
});

export class UserAuthentication{

    //Singleton
    public static Instance:UserAuthentication;

    static CreateInstance():void{
        UserAuthentication.Instance = new UserAuthentication();
    }

    static HasInstance():boolean{
        return UserAuthentication.Instance != null;
    }

    async CreateUser(_email:string, _password:string):Promise<void>{
        try{
            let user = await auth.createUserWithEmailAndPassword(_email,_password);
            console.log(user.user?.uid);
        }
        catch(error:any){
            console.log(error);
        }
    }

    async SignUserIn(_email:string, _password:string):Promise<void>{
        try{
            let user = await auth.signInWithEmailAndPassword(_email,_password);
            console.log(user.user?.uid);
        }
        catch(error:any){
            console.log(error)
        }
    }

    async SignUserOut(){
        try{
            await auth.signOut();
        }
        catch(error:any){
            console.log(error);
        }
    }

    GetCurrentUserId():string | undefined{
        return auth.currentUser?.uid;
    }

    IsUserSignedIn():boolean{
        return isUserSignedIn;
    }
}