# Le-ploy

A selfhosted railway/vercel/heroku built with nuxt 3

All data is kept on the filesystem mounted to /data within the container

this project uses traefik for reverse proxying

# warning

currently under development

check out [todos](TODO.md)

## Setup

Make sure to install the dependencies:

```bash
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
bun run dev
```

## Production

Build the application for production:

```bash
bun run build
```

Locally preview production build:

```bash
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
