//interface so that all the classes can override to return their own types of adapter

interface IDatabaseAdapter{
    GetDatabaseAdapter();
}

interface IJSONData{
    GetJsonData():string;
}

export {IDatabaseAdapter,IJSONData}