import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setDescription('The backend API description')
    .setVersion('1.0')
    .addTag('backend')
    .setOpenAPIVersion('3.0.0')
    .addBearerAuth()
    .build();

  const document = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document());

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
