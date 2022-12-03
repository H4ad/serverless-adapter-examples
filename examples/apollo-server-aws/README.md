# Apollo Server on AWS

See above how to develop and deploy to AWS Lambda.

## Development

First, install the libraries with:

```bash
npm i
```

Then, to test locally, run:

```bash
npm run start
```

## Deployment

> These steps only work if you have already created the lambda, otherwise see [how to create.](https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html)

> The lambda handler must be set to `dist/index.handler` to run smoothly.

To deploy to AWS, first change the `config` variables inside `package.json`.

- `aws_profile`: Put the configured profile name inside `$HOME/credentials`, the default value is `default`.
- `aws_region`: The region where your lambda is located.
- `aws_lambda_name`: The name of your lambda.

So, you must run:

```
npm run deploy
```

With this command it will compile, zip all node_modules and then update the lambda with its zip file.
