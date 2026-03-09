import { INestApplication } from '@nestjs/common';
import 'dotenv/config';

export function setupCors(app: INestApplication) {
  app.enableCors({
    origin: process.env.CLIENT_ORIGINS,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Private-Network',
    ],
  });
}
