//interface so that all the classes can override to return their own types of adapter

export class IDatabaseAdapter{
    public static GetDatabaseAdapter(){
        throw new Error("GetDatabaseAdapter not implemented");
    };
}