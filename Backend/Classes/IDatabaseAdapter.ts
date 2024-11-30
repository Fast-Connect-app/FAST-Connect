//interface so that all the classes can override to return their own types of adapter

class IDatabaseAdapter{
    public static GetDatabaseAdapter(){
        throw new Error("GetDatabaseAdapter not implemented");
    };
}

interface IJSONData{
    GetJsonData():string;
}

export {IDatabaseAdapter,IJSONData}