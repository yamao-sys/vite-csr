import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT) || 3000;
  app.enableCors({
    origin: 'http://localhost:5173',
  });
  await app.listen(port, '0.0.0.0');
}
bootstrap();
