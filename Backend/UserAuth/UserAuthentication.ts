import { FirebaseAuthError } from "firebase-admin/auth";
import {auth} from "../FirebaseApp"
const userAuth = auth;

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
            let user = await userAuth.createUserWithEmailAndPassword(_email,_password);
            console.log(user.user?.uid);
        }
        catch(error:any){
            console.log(error);
        }
    }

    async SignUserIn(_email:string, _password:string):Promise<void>{
        try{
            let user = await userAuth.signInWithEmailAndPassword(_email,_password);
            console.log(user.user?.uid);
        }
        catch(error:any){
            console.log(error)
        }
    }

    async SignUserOut(){
        try{
            await userAuth.signOut();
        }
        catch(error:any){
            console.log(error);
        }
    }

    GetCurrentUserId():string | undefined{
        return userAuth.currentUser?.uid;
    }
}

if(!UserAuthentication.HasInstance()){
    UserAuthentication.CreateInstance();
}

UserAuthentication.Instance.CreateUser("muhammadArhamAli003@test.com","hello12345");