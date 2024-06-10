## The blog membership NFT

The blog membership NFT consists of a SIP-009 NFT Contract with a few special rules regarding pricing.

Minting starts at `0,05 STX` and increases by a factor of 10 after every 25 tokens. So the first 25 tokens will cost `0,05 STX` to mint, then the next 25 `0,5 STX`, from 50 to 75 `5 STX` and so forth.

Transfers will incur a fee of 10% the current minting price. So if you transfer a token and the current minting price is `5 STX`, the token owner will need to pay `0,5 STX` for that transfer to succeed.

### Deploying the contract

If you're a developer running your own instance of the stxdev blog, you can use Clarinet to deploy your contract. You can find a guide on how to do it here: [How to deploy contracts](https://docs.hiro.so/clarinet/guides/how-to-deploy-contracts).

Another alternative is to use [Hiro Platform](https://platform.hiro.so/). You can find a guide on how to use Hiro Platform to deploy your contract here: [Deploy Project](https://docs.hiro.so/platform/guides/deploy-project).

Finally, you can also use the [Explorer Sandbox](https://explorer.hiro.so/sandbox/deploy?chain=mainnet) to manually deploy your contract. Connect your wallet, copy and paste the contents of [the contract](./contracts/stxdev.clar) in the Clarity code editor and click deploy. This might be the most straightforward option.

### Modifying the contract

Everyone is encouraged to modify the NFT contract managing blog membership. From the pricing model to the token name, everything can be customized, and as long as you keep implementing it as a SIP-009 NFT-token, it should still be compatible with the blog itself.
