export class BaseDatabaseAdapter{
    protected collectionName:string;

    constructor (_collectionName:string){
        this.collectionName = _collectionName;
    }
}