import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Biblioteca SAM')
    .setDescription('Documentação da API para Biblioteca SAM')
    .setVersion('1.0')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: true,
    });

  SwaggerModule.setup('openapi', app, documentFactory, {
    jsonDocumentUrl: '/openapi.json',
    swaggerOptions: { persistAuthorization: true },
  });
}
