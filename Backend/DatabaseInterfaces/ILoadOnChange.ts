export interface ILoadOnChange{
    LoadOnChange(id:string):Promise<string | null>;
}