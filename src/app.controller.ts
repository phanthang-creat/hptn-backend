import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { authorize, writeToSheet } from './config/google-sheet-client/initialization';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/sheet")
  getHello() {
    // const auth = authorize();

    // console.log(auth);

    // authorize().then(writeToSheet).catch(console.error);

    return this.appService.getHello();
  }
}
