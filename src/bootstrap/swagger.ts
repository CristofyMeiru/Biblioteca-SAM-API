import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Agenda Municipio')
    .setDescription('Documentação de API para Agenda Municipio')
    .setVersion('1.0')
    .addServer('/api')
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
