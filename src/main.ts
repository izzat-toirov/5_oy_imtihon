import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { UserService } from './user/user.service';



async function start() {
  try {
    const PORT = process.env.PORT ?? 3030;
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads/',
    });
    app.useStaticAssets(join(__dirname, '..', 'public')); 

    const config = new DocumentBuilder()
      .setTitle('inBook Project')
      .setDescription('NestJS RESTful API')
      .setVersion('1.0')
      .addTag('NestJS, AccessToken,RefreshToken, Cookie, SMS, BOT, Validation, Auth')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(PORT, () => {
      console.log(`✅ Server started at: http://localhost:${PORT}`);
      console.log(`📂 Static files available at: http://localhost:${PORT}/uploads`);
    });
    const userService = app.get(UserService);
    await userService.createSuperAdmin();
  } catch (error) {
    console.log(error);
  }
}

start();
