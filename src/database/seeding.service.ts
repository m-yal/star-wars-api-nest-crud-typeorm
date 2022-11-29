import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SeedingService {
    constructor(private readonly httpService: HttpService) {}

    async downloadRawDataToDB() {
        const {data} = await firstValueFrom(this.httpService.get("https://swapi.dev/api/people"));
        return data;
    }
}
