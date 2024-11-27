import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter";

export interface IDatabaseAdapter{
    GetDatabaseAdapter():BaseDatabaseAdapter;
}