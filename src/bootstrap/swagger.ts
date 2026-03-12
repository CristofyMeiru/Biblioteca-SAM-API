import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionResponseDto } from '@src/common/response-dto/http-exception.response-dto';
import { UnauthorizedResponseDto } from '@src/common/response-dto/unauthorized.response-dto';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Biblioteca SAM')
    .setDescription('Documentação da API para Biblioteca SAM')
    .setVersion('1.0')
    .addGlobalResponse(
      { status: 401, type: UnauthorizedResponseDto },
      { status: 403, type: UnauthorizedResponseDto },
      { status: 500, type: HttpExceptionResponseDto },
      { status: 400, type: HttpExceptionResponseDto },
    )
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
