# Serverless Adapter Example Project

Just a repository with express and huawei event sources to show how to integrate with [@h4ad/serverless-adapter](https://github.com/H4ad/serverless-adapter)

## Fastify

### AWS

- [Api Gateway V2](src/fastify/aws/api-gateway-v2.entry.ts)
  To deploy:
  - Run `npm run build:fastify:aws:api-gateway-v2`.
  - Then generate zip with: `npm run deploy:zip`.
  - With zip, just upload inside your lambda.

### Huawei

- [Http Function](src/fastify/huawei/http-api-gateway.entry.ts)
  To deploy:
  - Run `npm run build:fastify:huawei:http-api-gateway`.
  - Then generate zip with: `npm run deploy:zip`.
  - With zip, just upload inside your lambda.

- [Event Function with Api Gateway](src/fastify/huawei/event-api-gateway.entry.ts)
  To deploy:
  - Run `npm run build:fastify:huawei:event-api-gateway`.
  - Then generate zip with: `npm run deploy:zip`.
  - With zip, just upload inside your lambda.

## Express

### AWS

- [Api Gateway V2](src/express/aws/api-gateway-v2.entry.ts)
  To deploy:
  - Run `npm run build:fastify:aws:api-gateway-v2`.
  - Then generate zip with: `npm run deploy:zip`.
  - With zip, just upload inside your lambda.

### Huawei

- [Http Function](src/express/huawei/http-api-gateway.entry.ts)
  To deploy:
  - Run `npm run build:express:huawei:http-api-gateway`
  - Then generate zip with: `npm run deploy:zip`.
  - With zip, just upload inside your lambda.

- [Event Function with Api Gateway](src/express/huawei/event-api-gateway.entry.ts)
  To deploy:
  - Run `npm run build:express:huawei:event-api-gateway`
  - Then generate zip with: `npm run deploy:zip`.
  - With zip, just upload inside your lambda.

## tRPC

### AWS

- [Api Gateway V2](src/trpc/aws/api-gateway-v2.entry.ts)
  To deploy:
  - Run `npm run build:fastify:aws:api-gateway-v2`.
  - Then generate zip with: `npm run deploy:zip`.
  - With zip, just upload inside your lambda.

- [Api Gateway V2 and SQS](src/trpc/aws/api-gateway-v2-and-sqs.entry.ts)
  To deploy:
  - Run `npm run build:fastify:aws:api-gateway-v2-and-sqs`.
  - Then generate zip with: `npm run deploy:zip`.
  - With zip, just upload inside your lambda.

### Huawei

- [Http Function](src/trpc/huawei/http-api-gateway.entry.ts)
  To deploy:
  - Run `npm run build:express:huawei:http-api-gateway`
  - Then generate zip with: `npm run deploy:zip`.
  - With zip, just upload inside your lambda.

- [Event Function with Api Gateway](src/trpc/huawei/event-api-gateway.entry.ts)
  To deploy:
  - Run `npm run build:express:huawei:event-api-gateway`
  - Then generate zip with: `npm run deploy:zip`.
  - With zip, just upload inside your lambda.
