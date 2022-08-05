# Deepkit on AWS

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

To deploy to AWS, first change the `config` variables inside `package.json`.

- `aws_profile`: Put the configured profile name inside `$HOME/credentials`, the default value is `default`.
- `aws_region`: The region where your lambda is located.
- `aws_lambda_name`: The name of your lambda.

So, you must run:

```
npm run deployment
```

With this command it will compile, zip all node_modules and then update the lambda with its zip file.

## FAQ

### ERR_DLOPEN_FAILED

Error message: /var/task/node_modules/turbo-net/build/Release/turbo_net.node: cannot open shared object file: No such file or directory
Solution: Change your lambda architecture to `x86_64`.

### ENOENT

Error message: no such file or directory, mkdir 'var/debug/'
Solution:

```ts
// change these options
new HttpModule({ debug: true }),
  new FrameworkModule({ debug: true, httpLog: true }),
// for
  new HttpModule({ debug: false }),
  new FrameworkModule({ debug: false, httpLog: false }),
```
