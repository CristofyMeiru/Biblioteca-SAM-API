import { INestApplication } from '@nestjs/common';
import { apiReference } from '@scalar/nestjs-api-reference';

export function setupScalar(app: INestApplication) {
  app.use(
    '/docs',
    apiReference({
      theme: 'deepSpace',
      sources: [
        { url: '/openapi.json', title: 'API' },
        { url: '/api/auth/open-api/generate-schema', title: 'Auth' },
      ],
      withFastify: true,
    }),
  );
}
