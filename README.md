## Inspiration
For a long time, I wanted to work on some kind of blockchain application, but I didn't really have the experience or time to make it happen. Then one day I was browsing through Reddit and saw an advertisement for the NEAR Metabuild hackathon and decided to take a look. Sure enough, there was a "Welcome Track" that would be perfect for me to submit to. I'm really glad I decided to join the hackathon because I learned a lot about the blockchain world and NEAR protocol itself!

## Background
![Profile Photo](https://i.imgur.com/XJ4SoZJ.png)

My name is Anthony, I'm an undergraduate studying AI at Stanford University. I came into this project with a little bit of experience building full-stack applications and NO experience with Rust or NEAR protocol. You can often find me on the [NEAR protocol Discord](https://discord.gg/qKFREzxuTZ) in `#dev-support` asking or answering questions!

## Project
My project is a fully decentralized platform for music (like Spotify) where people can listen or post music and artists can earn NEAR from their listeners. 

There are 2 main problems that I try to address with this project:

_1) Artists should have ownership of their music and be able to freely trade their ownership of their music._

_2) Listeners should be able to listen to high-quality music and be able to directly support their favorite artists._

How does my application solve these problems? Artists can **upload their music as an NFT** which gives them ownership of their music which then can be **freely traded on any NFT marketplace.** They can also **attach royalties to their music** so that when ownership of the song is traded between owners, they get a portion of the revenue. The music is also **uploaded as lossless  _.wav_ files thanks to IPFS and Filecoin** providing a safe and easy way to store large files. This allows listeners to have access to the original audio that the artist intended for them to hear. The platform also **supports tipping your favorite artists with NEAR tokens,** so listeners support their favorite artists directly.

## How It's Built

There are two parts to the applications. The frontend was built using [NextJS](https://nextjs.org/) to support a faster and easier development workflow.  The backend was obviously built using [NEAR protocol](https://near.org/) and I did not require any 3rd party backend.

For the front-end, I used next-js-api to make RPC calls from my application.

### [/nearsound/context/NearProvider.js](https://github.com/pythonicode/nearsound/blob/main/context/NearProvider.js)
```js
const _tokens = near.connection.provider.query({
   request_type: "call_function",
   finality: "final",
   account_id: "nearsound.testnet",
   method_name: "nft_tokens",
   args_base64: DEFAULT_SEARCH,
});
const _search = near.connection.provider.query({
   request_type: "call_function",
   finality: "final",
   account_id: "nearsound.testnet",
   method_name: "get_search_terms",
   args_base64: EMPTY_QUERY,
});
const _request = near.connection.provider.experimental_genesisConfig();
const [default_tokens, search_terms, response] = await Promise.all([
   _tokens,
   _search,
   _request,
]);
```

There were 5 ways that my application communicated with my smart contract.

1) Fetch data from all tokens minted on the smart contract

2) Fetch data for a certain subset of tokens on the smart contract given a search term

3) Allow users to store an "Artist Name" associated with their account on the smart contract

4) Mint songs as NFTs while supporting the necessary data for the above use cases

5) Log transaction details so minting data can be fetched and displayed in the application




## Challenges we ran into

## Accomplishments that we're proud of

## What we learned

## What's next for Nearsound
