# The StxDev Blog
## A Stacks NFT-powered Blog Template - Powered By Next.js

Welcome to the stxdev blog template. This [Next.js](https://nextjs.org/) template allows you to run your NFT-gated Stacks blog easily. It is easily customizable, so you can [fork](https://github.com/vicnicius/stxdev.xyz/fork) and adapt it to your needs. It features members-only posts, where membership is controlled by the ownership of a [Stacks](https://stacks.foundation) NFT token you can deploy yourself. The NFT template and the corresponding tests are available in the [nft folder](./nft).


## Running your own
Running your blog based on this template should be easy, and you should be able to do it even if you don't have technical knowledge. It requires that you have a [github](https://github.com/) and a [vercel](https://vercel.com) account setup and a [stacks](https://stacks.foundation) wallet to deploy your NFT. With all that ready, follow these steps:

### 1. Deploy your Blog membership NFT to Stacks
The first step is to deploy your blog membership NFT. There is an NFT template available in the following location: [/nft/contracts/stxdev.clar](./nft/contracts/stxdev.clar). It is a simple SIP-009 smart contract with some custom logic added to charge a fee from token emissions and transfers. Minting a token costs 0,05 STX at the start, and this price increases 10x every 25 mints. The fee to transfer a token is 1/10 the current mint fee. This contract also implements an `is-owner` function, which is not part of the SIP but is required for the blog to work properly. It has the following signature:

```clarity
(define-read-only (is-token-owner (principal) (response bool)))
```

You're free to customize the template as you see fit, as long as it implements the SIP-009 and the extra `is-token-owner` read-only function. When you're ready, deploy the template to the Stacks blockchain network. You can use Hiro's Explorer to do it easily. Simply head to the [Explorer's Sansbox](https://explorer.hiro.so/sandbox/deploy?chain=mainnet), copy & paste the code for the contract there and deploy it.

**Notice that the wallet associated with the deployment is the wallet that will receive the minting and transfer fees.** Take note of the contract name you choose and the wallet address you'll use to deploy it.

### 2. Deploy your Blog
Make sure your Github account is connected to your Vercel account. Then, deploy your blog to Vercel. The easiest way to do it is to click this button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/vicnicius-projects/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvicnicius%2Fstxdev.xyz&env=NEXT_PUBLIC_CONSOLE_LINK,NEXT_PUBLIC_VERCEL_URL,NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,NEXT_PUBLIC_NFT_CONTRACT_NAME,NEXT_PUBLIC_APP_NAME,NEXT_PUBLIC_NETWORK,BLOCKCHAIN_API_URL,BLOCKCHAIN_API_KEY,SECRET_COOKIE_PASSWORD,COOKIE_NAME&envDescription=Check%20the%20docs%20to%20see%20a%20description%20of%20each%20variable)

Create a new private repository to host your blog source files. Then, on the **Configure Project** section, fill in the required envrionment variables:

| Environment Variable | Description | Example Value |
| --- | ----------- | ----- |
| NEXT_PUBLIC_CONSOLE_LINK | A link to the [Console](https://console.xyz) community associated with the blog | https://app.console.xyz/c/stxdev |
| NEXT_PUBLIC_VERCEL_URL | Your blog host, without protocol or trailing slashes | localhost:3000 |
| NEXT_PUBLIC_NFT_CONTRACT_ADDRESS | The address that deployed your Blog NFT Contract | ST1P...GZGM |
| NEXT_PUBLIC_NFT_CONTRACT_NAME | The NFT contracxt name | stxdev |
| NEXT_PUBLIC_APP_NAME | The name you want to associate with when interacting with the user wallet | stxdev.xyz |
| NEXT_PUBLIC_NETWORK | Which Stacks blockchain network you want to interact with. One of "devnet", "testnet" or "mainnet" | "devnet" |
| BLOCKCHAIN_API_URL | The API you'll be using to communicate with a Stacks node | https://localhost:3999 |
| BLOCKCHAIN_API_KEY | The key to authenticate requests to your Stacks node of choice | api-key-to-node |
| SECRET_COOKIE_PASSWORD | Used to encrypt your cookie information so the client cannot tamper the data | a-very-long-random-key...|
| COOKIE_NAME | The cookie identifier | blog-cookie |

And that's pretty much it. Your blog will be deployed to Vercel and you can start playing with it. Setup a nice custom domain and start sharing knowledge with your community.

### 3. Publishing Posts

In the previous step, you created a new git repository to host your blog's source code. You'll need to work with this repository to update your blog and publish new content. Clone this repository locally. If you're not familiar with git or github, make sure to check [github's docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository?tool=desktop). Once you clone it, the repository will be a folder on your own machine.

Every post in the blog is a markdown file in the [_posts](./_posts) subfolder. To write a new one, simply create a new `.md` file there. We're using [front matter](https://frontmatter.codes) to manage a page's metadata. This means that every markdown file starts with a special block of information delimited by `---`. Bellow is an example:

```markdown
---
title: "Lorem ipsum dolor sit amet"
excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun..."
date: "2020-03-16T05:35:07.322Z"
private: false
---
```

The `private` field has an special meaning. It controls whether the post will be publicly available or if it's a NFT-holder-only post.

Once you're done writing writing your blog post, [push the changes](https://docs.github.com/en/desktop/making-changes-in-a-branch/pushing-changes-to-github-from-github-desktop) to your remote git repository. This will automatically trigger a new deploy on Vercel, and your content update will be live in a few seconds!

## Contributions

All contributions are welcome!

This is a project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
