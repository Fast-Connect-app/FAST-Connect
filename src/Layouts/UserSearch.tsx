import { Component, ReactNode } from "react";
import { Profile } from "../../Backend/Classes/Profile";

interface UserSearchedComponent{
    avatar:string;
    name:string;
}

export class UserSearchComponent extends Component<{},{}>{
    profileAdapter = Profile.GetDatabaseAdapter();

    constructor({props}:any){
        super(props);
        this.state = {isOpen:Boolean,
            userSearchResults:[] as UserSearchedComponent[]
        };
    }

    async DisplayUsers(id:string){
        let input = document.getElementById(id) as HTMLInputElement;
        let name = input.value;
        const data = await this.profileAdapter.LoadByName("userName",name);
        if(data !== null){
            let i = 0;
            data.forEach(user => {
                this.state.userSearchResults[i].avatar = user.profilePic;
                this.state.userSearchResults[i].name = user.userName;
                i = i + 1;
            });
        }
    }

    render() {
        return (
            <>
                <input type="text" placeholder="Search Users" id = "searchUsersInputField"/>
                <button id = "searchUsersButton" onClick = {()=>{
                    this.DisplayUsers("searchUsersInputField");
                }} >Search</button>
            </>
        )
    }
}