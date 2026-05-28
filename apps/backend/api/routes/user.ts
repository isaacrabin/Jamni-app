// apps/backend/api/routes/user.ts

import { Router } from 'express';
import { Type, Static } from '@sinclair/typebox';

import { validate } from '../middleware/validate';
import { registry } from '../registry';
import * as UserController from '../controllers/user';

// ─── Schemas ─────────────────────────────────────────

export const UserSchema = Type.Object(
  {
    id: Type.Integer({ example: 1 }),
    name: Type.String({ example: 'John Doe' }),
    email: Type.String({ format: 'email', example: 'john@example.com' }),
    createdAt: Type.String({ format: 'date-time' }),
  },
  { $id: 'User' }
);

export type User = Static<typeof UserSchema>;

export const CreateUserSchema = Type.Object(
  {
    name: Type.String({
      minLength: 2,
      maxLength: 100,
      example: 'John Doe',
    }),
    email: Type.String({ format: 'email', example: 'john@example.com' }),
    age: Type.Optional(
      Type.Integer({
        minimum: 0,
        maximum: 150,
        example: 25,
      })
    ),
  },
  { $id: 'CreateUserDto' }
);

export type CreateUserDto = Static<typeof CreateUserSchema>;

export const UpdateUserSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ minLength: 2, maxLength: 100 })),
    email: Type.Optional(Type.String({ format: 'email' })),
    age: Type.Optional(Type.Integer({ minimum: 0, maximum: 150 })),
  },
  { $id: 'UpdateUserDto' }
);

export type UpdateUserDto = Static<typeof UpdateUserSchema>;

export const UserIdParamSchema = Type.Object({
  id: Type.Integer({ minimum: 1, example: 1 }),
});

export type UserIdParams = Static<typeof UserIdParamSchema>;

// ─── Registry ─────────────────────────────────────────

registry.register('User', UserSchema);
registry.register('CreateUserDto', CreateUserSchema);
registry.register('UpdateUserDto', UpdateUserSchema);

// ─── Paths ─────────────────────────────────────────────

registry.registerPath({
  method: 'get',
  path: '/api/users',
  tags: ['Users'],
  summary: 'Get all users',
  responses: {
    200: {
      description: 'List of users',
      content: {
        'application/json': {
          schema: Type.Object({
            users: Type.Array(UserSchema),
          }),
        },
      },
    },
    500: { description: 'Server error' },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/users',
  tags: ['Users'],
  summary: 'Create a new user',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: CreateUserSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'User created successfully',
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
    },
    400: { description: 'Validation error' },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/users/{id}',
  tags: ['Users'],
  summary: 'Get user by ID',
  request: {
    params: UserIdParamSchema,
  },
  responses: {
    200: {
      description: 'User details',
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
    },
    404: { description: 'User not found' },
  },
});

registry.registerPath({
  method: 'put',
  path: '/api/users/{id}',
  tags: ['Users'],
  summary: 'Update user',
  request: {
    params: UserIdParamSchema,
    body: {
      required: true,
      content: {
        'application/json': {
          schema: UpdateUserSchema,
        },
      },
    },
  },
  responses: {
    200: { description: 'User updated successfully' },
    404: { description: 'User not found' },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/api/users/{id}',
  tags: ['Users'],
  summary: 'Delete user',
  request: {
    params: UserIdParamSchema,
  },
  responses: {
    204: { description: 'User deleted successfully' },
    404: { description: 'User not found' },
  },
});

// ─── Router ─────────────────────────────────────────────

const router = Router();

router.get('/', UserController.getAllUsers);

router.post(
  '/',
  validate(CreateUserSchema, 'body'),
  UserController.createUser
);

router.get(
  '/:id',
  validate(UserIdParamSchema, 'params'),
  UserController.getUserById
);

router.put(
  '/:id',
  validate(UserIdParamSchema, 'params'),
  validate(UpdateUserSchema, 'body'),
  UserController.updateUser
);

router.delete(
  '/:id',
  validate(UserIdParamSchema, 'params'),
  UserController.deleteUser
);

export default router;
