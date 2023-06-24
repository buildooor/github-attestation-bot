export const supportedNetworks = new Set(['mainnet', 'sepolia', 'optimism-goerli'])

export const defaultRpcUrls: Record<string, string> = {
  'mainnet': 'https://rpc.eth.gateway.fm',
  'goerli': 'https://goerli.gateway.tenderly.co',
  'sepolia': 'https://sepolia.gateway.tenderly.co',
  'optimism-goerli': 'https://goerli.optimism.io',
  'optimism': 'https://mainnet.optimism.io'
}

export const explorerUrls: Record<string, string> = {
  'mainnet': 'https://etherscan.io',
  'goerli': 'https://goerli.etherscan.io',
  'sepolia': 'https://sepolia.etherscan.io',
  'optimism-goerli': 'https://goerli-optimism.etherscan.io',
  'optimism': 'https://optimistic.etherscan.io'
}

export const easUrls: Record<string, string> = {
  'mainnet': 'https://easscan.org',
  'goerli': 'https://goerli.easscan.org',
  'sepolia': 'https://sepolia.easscan.org',
  'optimism-goerli': 'https://optimism-goerli.easscan.org',
  'optimism': 'https://optimism.easscan.org'
}

export const githubToken = process.env.GITHUB_TOKEN
export const githubWebhookSecret = process.env.GITHUB_WEBHOOK_SECRET
export const port = process.env.PORT || 8000
export const privateKey = process.env.PRIVATE_KEY
export const network = process.env.NETWORK || 'sepolia'
export const rpcUrl = process.env.RPC_URL || defaultRpcUrls[network]

const _branch = process.env.BRANCH ?? 'main'
const _branches = process.env.BRANCHES?.split(',') ?? []
export const allowedBranches = _branches?.length ? _branches : [_branch]
