# GitHub PR Attestation Bot

> A GitHub PR Attestation Bot that automatically make an attestation to the [Ethereum Attestation Service](https://easscan.org/) every time a PR is merged into a repository's main branch. This attestation contains a reference to the repository, the specific PR number, the branch name the PR was merged to, and the GitHub username of the account that created the PR.

<img src="https://user-images.githubusercontent.com/168240/248449700-e2ac0c3e-c5bd-4e24-b29f-2572665fbd03.png" width="700px">

Example pull request merged with attestation bot submission:

https://github.com/buildooor/github-action-test/pull/31

## Demo Bot Install

[https://github.com/apps/pr-attestation](https://github.com/apps/pr-attestation)

Install the demo bot on your repository to see how it works. The bot will automatically make an attestation to the Ethereum Attestation Service on Sepolia every time a PR is merged into the `master` branch of the selected repository.

<img src="https://user-images.githubusercontent.com/168240/248449531-da08e3d9-2c9b-4bce-afad-4bd696c6ed01.png" width="500px">

## Install your own bot

### Development

Install dependencies:

```sh
npm install
```

Build:

```sh
npm run build
```

Set up environmtent variables:

```sh
cp sample.env .env
```

Environment variables:

```sh
# Signer private key (required)
PRIVATE_KEY=

# Github personal token of bot account (required)
GITHUB_TOKEN=

# Github webook secret (optional)
GITHUB_WEBHOOK_SECRET=

# Network to post attestation to (default "sepolia")
NETWORK=sepolia

# RPC URL to use (optional)
RPC_URL=

# The main branch to trigger attestations on when PR is merged (default "main")
BRANCH=main
```

Run:

```sh
npm run start
```

The webhook will be available at `http://localhost:8000/payload`.

### Docker

Alternatively, you can run the bot in a Docker container.

Build:

```sh
docker build -t github-attestation-bot .
```

Run:

```sh
docker run --env-file=.env -p 8000:8000 github-attestation-bot
```

## Github App Setup

You will need to create a Github App to use trigger the bot server via webhooks.

1. Go to [https://github.com/settings/apps]
1. Click "New Github App" button
1. Fill out "GitHub App name" and "Homepage URL" fields
1. Fill out "Webhook URL", add the URL of the bot server: `http://<bot-server-ip>:8000/payload`. If you are running the bot locally, you can use [ngrok](https://ngrok.com/) to create a tunnel to your local server.
1. Under "Repository permissions" and "Pull requests", select "Read and write" access
    <img src="https://user-images.githubusercontent.com/168240/248449094-5d63d232-fb8b-4cda-9e8e-a83440ad8461.png" width="500px">
1. Under "Subscribe to events", check "Pull request"
    <img src="https://user-images.githubusercontent.com/168240/248449340-0e1bd936-2f81-4ca8-a504-0d2faf26863c.png" width="500px">
1. Click "Create GitHub App"
1. After creation, click on "Generate a private key"
1. Click on "Permissions & events" on the sidebar

## References

- [Ecosystem Project Idea: GitHub PR Attestation Bot#67](https://github.com/orgs/ethereum-optimism/projects/31/views/4?pane=issue&itemId=29632592)

## License

[MIT](LICENSE)
