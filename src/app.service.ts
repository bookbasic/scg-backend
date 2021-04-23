import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Anonymous!';
  }
  getAuthen(): string {
    return 'Hello User!';
  }
}
