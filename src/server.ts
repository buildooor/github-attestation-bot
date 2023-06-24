import express from 'express'
import bodyParser from 'body-parser'
import cryptoLib from 'crypto'
import { Octokit } from '@octokit/rest'
import { port, githubToken, githubWebhookSecret, privateKey, network, rpcUrl, allowedBranches, explorerUrls, easUrls } from './config'
import { attest } from './attest'

const app = express()
require('dotenv').config()

if (!githubToken) {
  console.warn('GITHUB_TOKEN is not set')
}

if (!githubWebhookSecret) {
  console.warn('GITHUB_WEBHOOK_SECRET is not set')
}

async function attestTx(input: any) {
  const { privateKey, network, rpcUrl, repo, branch, username, pullRequest } = input

  const { hash, uid } = await attest({
    privateKey,
    network,
    rpcUrl,
    repo,
    branch,
    username,
    pullRequest
  })

  console.log('Transaction hash:', hash)
  console.log('Attestation UID:', uid)

  return {
    hash,
    uid
  }
}

async function checkEvent (payload: any) {
  // If the action is closed and the pull request is merged
  const isPullRequestMerged = !!payload?.pull_request && payload?.action == 'closed' && payload?.pull_request?.merged

  if (!isPullRequestMerged) {
    console.log('event is not a pull request merge, skipping attestation.')
    return
  }

  console.log('Pull request was merged!')

  const owner =  payload?.repository?.owner?.login
  const repo = payload?.repository?.name
  const pullRequest = payload?.pull_request?.number

  const branch = payload?.pull_request?.base?.ref
  const username = payload?.pull_request?.user?.login

  if (!pullRequest) {
    console.log('pull request number is not available, skipping attestation.')
    return
  }

  if (!repo) {
    console.log('repo is not available, skipping attestation.')
    return
  }

  if (!branch) {
    console.log('branch is not available, skipping attestation.')
    return
  }

  if (!username) {
    console.log('username is not available, skipping attestation.')
    return
  }

  if (!allowedBranches.includes(branch)) {
    console.log(`branch "${branch}" is not an allowed branch, skipping attestation.`)
    return
  }

  return {
    owner,
    repo,
    pullRequest,
    branch,
    username
  }
}

const octokit = new Octokit({
  auth: githubToken
})

// GitHub sends the payload as JSON
app.use(bodyParser.json())

app.post('/payload', async (req: any, res: any) => {
  try {
    let authOk = true
    if (githubWebhookSecret) {
      // The X-Hub-Signature is sent as a header in the post request
      const signature = req.headers['x-hub-signature']

      // Create our HMAC token
      const hmac = cryptoLib.createHmac('sha1', githubWebhookSecret)

      // Update it with the JSON body
      const digest = 'sha1=' + hmac.update(JSON.stringify(req.body)).digest('hex')

      // Check if our digests match
      authOk = signature === digest
    }

    if (!authOk) {
      console.log('auth failed')
      res.status(401).send('Auth failed')
      return
    }

    const event = await checkEvent(req.body)
    if (!event) {
      res.status(200).send('Received')
      return
    }

    const {
      owner,
      repo,
      pullRequest,
      branch,
      username
    } = event

    let commentMsg = ''
    try {
      console.log('Attempting to post attestation...')
      const { hash, uid } = await attestTx({
        privateKey,
        network,
        rpcUrl,
        repo,
        branch,
        username,
        pullRequest,
      })

      const explorerLink = `${explorerUrls[network]}/tx/${hash}`
      const easLink = `${easUrls[network]}/attestation/view/${uid}`
      commentMsg = `Successfully posted attestation! ✨\n\nTransaction: \`${hash}\`\n${explorerLink}\n\nAttestation UID: \`${uid}\`\n${easLink}`
    } catch (err: any) {
      console.error(err)
      commentMsg = `Failed to post attestation. Error: ${err.message}`
    }

    if (commentMsg) {
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: pullRequest,
        body: commentMsg,
      })
    }
  } catch (err: any) {
    console.error(err)
    res.status(400).json({error: err.message})
  }
})

app.listen(port, () => console.log('Server is running on port', port))
