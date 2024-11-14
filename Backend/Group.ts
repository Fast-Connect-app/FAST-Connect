export class Group{
    private name:string;
    private description: string;
    private usersList:string[];
    private groupAdminList: string[];

    constructor(_name:string, _description:string, _usersList: string[], _originalAdmin:string){
        this.name = _name;
        this.description = _description;
        this.usersList = _usersList;

        this.groupAdminList.push(_originalAdmin)
    }
}