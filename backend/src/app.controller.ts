import {Controller, Get, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import * as process from "node:process";
import {AuthGuard} from "./auth/auth.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
