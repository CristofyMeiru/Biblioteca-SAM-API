import { bootstrapApp } from './bootstrap/app';

async function bootstrap() {
  const app = await bootstrapApp();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
