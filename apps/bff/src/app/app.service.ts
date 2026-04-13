import { Injectable } from '@nestjs/common';
import { PORT } from '@common/constants/lib/common.constant';
import { log } from 'console';

@Injectable()
export class AppService {
  getData(): { message: string } {
    log(PORT);
    return { message: 'Hello API' };
  }
}
