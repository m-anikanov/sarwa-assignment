# Getting Started with Sarwa-assignment

## Quick Start

### 1. Node & NPM versions

I've tested code with `npm 8.9.0` and `node 18.2.0`. But it will probably work with other versions as well.

You can use `nvm` to select desired versions:

```
 $ nvm use
```

### 2. Deps
```
 $ npm i
```

### 3. Build
```
 $ npm run build
```

### 4. Launch

```
 $ npm run launch
```

### Other commands
You can use this command to start both client and server in `dev mode`:
```
$ npm start
```

Start only client in `dev mode`:
```
$ npm run client-dev
```

Start only server in `dev mode`:
```
$ npm run server-dev
```

## Mocked data

Mocked data is transfers to the local in memory database when the server is started.

So You can replace any data in the `__mock__.json` file as you wish. And restart server then.