import { Profile } from "../Classes/Profile";
import { auth } from "../FirebaseApp";
import { db } from "../FirebaseApp";

let isUserSignedIn: boolean = false;

auth.onAuthStateChanged((user) => {
  isUserSignedIn = user != null;
});

export class UserAuthentication {
  //Singleton
  public static Instance: UserAuthentication;

  public static GetInstance() {
    if (UserAuthentication.Instance == null) {
      UserAuthentication.Instance = new UserAuthentication();
    }

    return UserAuthentication.Instance;
  }

  async CreateUser(_name: string, _email: string, _password: string): Promise<void> {
    try {
      const user = await auth.createUserWithEmailAndPassword(_email, _password);
      const profileAdapter = Profile.GetDatabaseAdapter();
      //Map a sample profile to DocumentData
      const saveProfile: Profile = new Profile("", _email, _name, new Date(), "", "", "", "");
      if (user.user != null) profileAdapter.SaveById(user.user?.uid, saveProfile.GetJsonData());
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error as Error;
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  async SignUserIn(_email: string, _password: string): Promise<string> {
    try {
      await auth.signInWithEmailAndPassword(_email, _password);
      return "Success";
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error as Error;
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  async SignUserOut() {
    try {
      await auth.signOut();
    } catch (error) {
      if (error instanceof Error) {
        throw error as Error;
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  GetCurrentUserId(): string | undefined {
    return auth.currentUser?.uid;
  }

  async GetCurrentUserProfile(): Promise<Profile | null> {
    try {
      const profileAdapter = Profile.GetDatabaseAdapter();
      let uid: string;
      if (auth.currentUser != null) {
        uid = auth.currentUser.uid;
      } else {
        return null;
      }
      const userProfileData = await profileAdapter.LoadById(uid);
      if (userProfileData === null) {
        return null;
      }
      const parsedJSON = JSON.parse(userProfileData);
      const userProfile: Profile = Profile.fromFirebaseJson(parsedJSON);
      return userProfile;
    } catch (error) {
      if (error instanceof Error) {
        throw error as Error;
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  IsUserSignedIn(): boolean {
    return isUserSignedIn;
  }

  async GetCurrentUserType(): Promise<string | null> {
    try {
      // Fetch the document
      const userDoc = await db.collection("Profiles").doc(auth.currentUser?.uid).get();

      if (userDoc.exists) {
        const userData = userDoc.data(); // Retrieve the data

        // Check and return the 'type' field
        return userData?.type || null;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error as Error;
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}
