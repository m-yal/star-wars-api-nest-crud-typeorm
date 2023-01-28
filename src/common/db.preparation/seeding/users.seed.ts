import { config } from 'dotenv';
import { Users } from 'src/modules/auth/entities/users.entity';
import { DataSource, Repository } from 'typeorm';

config();

export default class UsersSeeder {

    constructor(private readonly dataSource: DataSource) { }

    public async baseDataSeed(): Promise<void> {
        await this.insertBaseData();
    }

    public async setRelations(): Promise<void> {
        //do nothing
    }



    private async insertBaseData() {
        const usersRepository = this.dataSource.getRepository(Users);
        await this.insertAdmins(usersRepository);
    }

    private async insertAdmins(usersRepository: Repository<Users>) {
        const admin = usersRepository.create({
            username: process.env.ADMIN_USER_LOGIN,
            password: process.env.ADMIN_USER_PASSWORD,
        })
        await usersRepository.save(admin);
    }
}