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
read bitbucket_username

BITBUCKET_USERNAME="$bitbucket_username" \
BITBUCKET_PASSWORD="$bitbucket_password" \
PROJECTS_ENDPOINT="http://localhost:8080/api/project" \
API_KEY="dependency-scanner.56a1dcc9-ffd5-430f-a6ab-25c8adf6ab0d" \
USE_PREDEFINED_PROJECTLIST="1" \
PUBSUB_SUBSCRIPTION_ID="projects/bu-fyp-s5008913/subscriptions/project-scan-sub" \
PUBSUB_MAX_MESSAGES_PER_RUN="5" \
RUN_DELAY_SECONDS="30" \
node dist/index.js
```

Optionally remove
```bash
USE_PREDEFINED_PROJECTLIST="1" 
```
to use cloud pub/sub.

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

Dependency-scanner now scans any project IDs it pulls from cloud pub/sub messages.
The topic subscription ID is passed as the environment variable
`PUBSUB_SUBSCRIPTION_ID="projects/projectid/subscriptions/subscriptionid"`

<details><summary>Deprecated Way</summary>
<p>
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
</p>
</details>

## Deployment

### First

You may need to get kubectl set up using the gcloud tool:
```bash
gcloud container clusters get-credentials dependency-scanner-cluster-1 
--zone europe-west2-a --project bu-fyp-s5008913
```

Run:
```bash
scripts/build_and_push_docker_image.sh`
```

Then:
```bash
kubectl apply -f src/resources/deployment.yaml
```

You can check on the status of pods with:
```bash
kubectl describe pods
```