import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getData(): { message: string } {
        throw new BadRequestException('Bad request rồi :v');
        return { message: 'Hello API' };
    }
}
