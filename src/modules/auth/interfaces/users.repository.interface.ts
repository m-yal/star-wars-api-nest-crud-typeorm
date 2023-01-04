export interface UsersRepository {
    findOneBy(username: string): Promise<any>;
    insertOne(username: string, password: string): Promise<any>;
}