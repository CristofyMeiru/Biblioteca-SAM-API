import { Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { auth } from '@src/lib/auth';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { AllowAnonymous } from '../decorators/auth.decorators';

@ApiExcludeController()
@AllowAnonymous()
@Controller('auth')
export class AuthController {
  @Get('*')
  async handleGet(@Req() request: FastifyRequest, @Res() reply: FastifyReply) {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);

      const headers = this.buildHeaders(request);

      const req = new Request(url.toString(), {
        method: 'GET',
        headers,
      });

      const response = await auth.handler(req);

      await this.forwardResponse(response, reply);
    } catch (error) {
      this.handleError(error, reply);
    }
  }

  @Post('*')
  async handlePost(@Req() request: FastifyRequest, @Res() reply: FastifyReply) {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);

      const headers = this.buildHeaders(request);
      const body =
        request.body != null
          ? typeof request.body === 'string'
            ? request.body
            : JSON.stringify(request.body)
          : undefined;

      const req = new Request(url.toString(), {
        method: 'POST',
        headers,
        body,
      });

      const response = await auth.handler(req);

      await this.forwardResponse(response, reply);
    } catch (error) {
      this.handleError(error, reply);
    }
  }

  private buildHeaders(request: FastifyRequest): Headers {
    const headers = new Headers();

    for (const [key, value] of Object.entries(request.headers)) {
      if (value !== undefined) {
        headers.append(key, String(value));
      }
    }

    return headers;
  }

  private async forwardResponse(response: Response, reply: FastifyReply) {
    reply.status(response.status);

    response.headers.forEach((value, key) => {
      reply.header(key, value);
    });

    const text = response.body ? await response.text() : null;
    reply.send(text);
  }

  private handleError(_error: unknown, reply: FastifyReply) {
    reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'Internal authentication error',
      code: 'AUTH_FAILURE',
    });
  }
}
