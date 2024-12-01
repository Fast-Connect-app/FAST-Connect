import {auth} from "../FirebaseApp"
import { db } from "../FirebaseApp";

let isUserSignedIn:boolean = false;

auth.onAuthStateChanged(user=>{
    isUserSignedIn = user != null;
});

export class UserAuthentication{

    //Singleton
    public static Instance:UserAuthentication;

    public GetInstance(){
        if (UserAuthentication.Instance == null){
            UserAuthentication.Instance = new UserAuthentication();
        }

        return UserAuthentication.Instance;
    }

    async CreateUser(_email:string, _password:string):Promise<string>{
        try{
            let user = await auth.createUserWithEmailAndPassword(_email,_password);
            console.log(user.user?.uid);
            return "Successful";
        }
        catch(error:any){
            console.log(error);
            return error.toISOString();
        }
    }

    async SignUserIn(_email:string, _password:string):Promise<string>{
        try{
            let user = await auth.signInWithEmailAndPassword(_email,_password);
            console.log(user.user?.uid);
            return "Successful"
        }
        catch(error:any){
            console.log(error)
            return error.toISOString();
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

    async GetCurrentUserType():Promise<string | null> {
        try {
            // Fetch the document
            const userDoc = await db.collection("Users").doc(auth.currentUser?.uid).get();
    
            if (userDoc.exists) {
                const userData = userDoc.data(); // Retrieve the data
    
                // Check and return the 'type' field
                return userData?.type || null; 
            } else {
                console.log("No such document!");
                return null;
            }
        } catch (error) {
            console.error("Error fetching user type:", error);
            return null;
        }
    }
}