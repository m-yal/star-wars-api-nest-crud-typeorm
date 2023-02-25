import { config } from 'dotenv';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Users } from '../../../modules/auth/entities/users.entity';

config();

export default class UsersSeeder {

    private readonly usersRepository: Repository<Users>

    constructor(private readonly queryRunner: QueryRunner) { 
        this.usersRepository = this.queryRunner.manager.getRepository(Users);
    }

    public async baseDataSeed(): Promise<void> {
        await this.insertBaseData();
    }

    public async setRelations(): Promise<void> {
        //do nothing
    }



    private async insertBaseData(): Promise<void> {
        await this.insertAdmins();
    }

    private async insertAdmins(): Promise<void> {
        const admin: Users = this.usersRepository.create({
            username: process.env.ADMIN_USER_LOGIN,
            password: process.env.ADMIN_USER_PASSWORD,
        })
        await this.usersRepository.save(admin);
    }
}