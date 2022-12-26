# NestJS on GCP

See above how to develop and deploy to GCP Http Functions.

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

To deploy to GCP, first change the `config` variables inside `package.json`.

- `gcp_project`: The name of this project, configured in `gcloud init`.
- `gcp_region`: The region where your function is located.
- `gcp_runtime`: The runtime of the function.
- `gcp_entrypoint`: The name of the exposed function (should be the same at `index.ts`).

So, you must run:

```
npm run deploy
```

> Still have questions? [See more](https://cloud.google.com/functions/docs/console-quickstart)
