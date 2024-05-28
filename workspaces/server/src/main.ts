import { HttpExceptionFilter } from '@core/filters/httpException.filter';
import { ResponseInterceptor } from '@core/interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const origins = app.get(ConfigService).get<Array<string>>('origins');
  const PORT = app.get(ConfigService).get<number>('PORT');

  app.enableCors({ origin: origins, credentials: true });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Chatopia api example')
    .setDescription('The chatopia api description')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  process.env.NODE_ENV === 'development' &&
    SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
}
bootstrap();
