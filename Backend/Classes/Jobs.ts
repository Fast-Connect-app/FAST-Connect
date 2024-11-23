export class Jobs{
    private title:string;
    private salary:number;
    private ownerUserId:string;

    constructor(_title:string, _salary:number, _ownerUserId:string){
        this.title = _title;
        this.salary = _salary;
        this.ownerUserId = _ownerUserId;
    }
}