# NestJS on DigitalOcean

See above how to develop and deploy to DigitalOcean.

## Development

First, install the libraries with:

```bash
npm i
```

Then, to test locally, run:

```bash
npm run start:debug
```

## Deployment

You must run:

```bash
npm run deploy
```

With this command it will compile, zip all node_modules and then update the function with its zip file.
