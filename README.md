# GitHub PR Attestation Bot

> A GitHub PR Attestation Bot that automatically make an attestation to the [Ethereum Attestation Service](https://easscan.org/) every time a PR is merged into a repository's main branch. This attestation contains a reference to the repository, the specific PR number, the branch name the PR was merged to, and the GitHub username of the account that created the PR.

## Install Bot

[https://github.com/apps/pr-attestation](https://github.com/apps/pr-attestation)

## Development

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

## Docker

Build:

```sh
docker build -t github-attestation-bot .
```

Run:

```sh
docker run --env-file=.env -p 8000:8000 github-attestation-bot
```

## References

- [Ecosystem Project Idea: GitHub PR Attestation Bot#67](https://github.com/orgs/ethereum-optimism/projects/31/views/4?pane=issue&itemId=29632592)

## License

[MIT](LICENSE)
