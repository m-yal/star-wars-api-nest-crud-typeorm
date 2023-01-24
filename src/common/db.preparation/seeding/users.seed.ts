import * as bcrypt from 'bcrypt';
import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Factory, Seeder } from 'typeorm-seeding';

import { Role } from '../../src/auth/roles';
import { User } from '../../src/auth/entity/user.entity';

const SALT_ROUNDS = 12;

@Injectable()
export default class FilmsSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const password = await bcrypt.hash('12345', SALT_ROUNDS);
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        email: 'user@nomail.com',
        password: password,
        role: Role.ADMIN,
      })
      .execute();
  }
}
