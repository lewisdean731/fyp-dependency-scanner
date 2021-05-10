# Dependency Scanner

## About

Identified out of date dependencies in software projects.

## Installation

```bash
npm install
npm run compile
```

## Usage

### Local machine

```bash
read -s bitbucket_password

BITBUCKET_USERNAME="$USER" \
BITBUCKET_PASSWORD="$bitbucket_password" \
node dist/src/index.js
```

### Output

Output is shown in the console while dependency-scanner is running. 

**If you get a 401 error when trying to connect to bitbucket**:

Log out of bitbucket and log in again via your browser. You probably need to
answer a CAPTCHA which seems to cause 401 error when trying to CURL.

## Testing

```bash
npm test
```

Coverage reports are located in `./coverage`

## Development

Run prettier:

```bash
npm run prettier:<check|write>
```

Compile your code to JavaScript:

```bash
npm run compile
```

## Add a new project to analyse

A list of projects dependency-scanner inspects can be found at
`src/projects.ts`. To add a new project to be inspected when it runs, add the
relevant project information.

For a project using NPM (package.json & package-lock.json), add the following
under `npmProjects`:

```typescript
    {
      projectName: "NPM Project Name",
      packageJsonUrl:
        "https://bitbucket.il2management.local/path-to-raw-package-json",
      packageLockUrl:
        "https://bitbucket.il2management.local/path-to-raw-package-lock-dot-json"
    }
```
Run `npm run compile` after adding a project to compile it to JavaScript.