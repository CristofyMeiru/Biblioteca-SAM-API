import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '../app.module';
import { setupCors } from './cors';
import { setupGlobalPipes } from './pipes';
import { setupScalar } from './scalar';
import { setupSwagger } from './swagger';

export async function bootstrapApp(): Promise<NestFastifyApplication> {
  const NODE_ENV = process.env.NODE_ENV;

  const adapter = new FastifyAdapter({});

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, {
    bodyParser: false,
  });

  app.enableVersioning({ type: VersioningType.URI });
  setupCors(app);
  setupGlobalPipes(app);
  if (NODE_ENV != 'production') {
    setupSwagger(app);
    setupScalar(app);
  }

  // if (NODE_ENV == 'production') {
  //   app.useLogger(app.get(CustomLogger));
  // }

  return app;
}
