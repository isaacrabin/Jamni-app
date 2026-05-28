import { TSchema } from '@sinclair/typebox';

type HttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete';

interface RegisterPathOptions {
  method: HttpMethod;
  path: string;
  tags?: string[];
  summary?: string;

  request?: {
    params?: TSchema;

    query?: TSchema;

    body?: {
      required?: boolean;

      content: {
        'application/json': {
          schema: TSchema;
        };
      };
    };
  };

  responses: Record<
    number,
    {
      description: string;

      content?: {
        'application/json': {
          schema: TSchema;
        };
      };
    }
  >;
}

class OpenAPIRegistry {
  private schemas: Record<string, TSchema> = {};

  private paths: Record<string, any> = {};

  register(name: string, schema: TSchema) {
    this.schemas[name] = schema;
  }

  registerPath(config: RegisterPathOptions) {
    const {
      method,
      path,
      tags,
      summary,
      request,
      responses,
    } = config;

    if (!this.paths[path]) {
      this.paths[path] = {};
    }

    const formattedResponses: Record<string, any> = {};

    for (const [statusCode, response] of Object.entries(
      responses
    )) {
      formattedResponses[statusCode] = {
        description: response.description,
      };

      if (response.content) {
        formattedResponses[statusCode].content =
          response.content;
      }
    }

    this.paths[path][method] = {
      tags,
      summary,

      parameters: [
        ...(request?.params
          ? Object.entries(request.params.properties ?? {}).map(
              ([key, schema]: [string, any]) => ({
                name: key,
                in: 'path',
                required: true,
                schema,
              })
            )
          : []),

      
        ...(request?.query
        ? Object.entries(request.query.properties ?? {}).map(
            ([key, schema]: [string, any]) => ({
                name: key,
                in: 'query',

                required:
                Array.isArray(request.query?.required) &&
                request.query.required.includes(key),

                schema,
            })
            )
        : []),
      ],

      requestBody: request?.body
        ? {
            required: request.body.required ?? true,

            content: request.body.content,
          }
        : undefined,

      responses: formattedResponses,
    };
  }

  getDefinitions() {
    return {
      schemas: this.schemas,
      paths: this.paths,
    };
  }
}

export const registry = new OpenAPIRegistry();

export function generateOpenAPIDocument() {
  const { schemas, paths } = registry.getDefinitions();

  return {
    openapi: '3.0.0',

    info: {
      title: 'Jamni App API',
      version: '1.0.0',
      description: 'API documentation for Jamni App',
    },

    servers: [
      {
        url:
          process.env.API_URL ??
          'http://localhost:8000',

        description: 'Development server',
      },
    ],

    paths,

    components: {
      schemas,
    },
  };
}
