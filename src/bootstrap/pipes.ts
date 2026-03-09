import { INestApplication, ValidationPipe } from '@nestjs/common';

export function setupGlobalPipes(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
}
