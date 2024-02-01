# Description of GrandGames SDK and information for developers

The information is intended for HTML5 developers who want to add their games to our catalog: https://grandgames.net/games

To add a game to GrandGames, SDK implementation is not required,
however, this will allow the game to be more closely integrated with the portal, which will improve the convenience for players.

TypeScript interface with a description of all features: [GamesSDK.interface.ts](/en/GamesSdk.interface.ts)

To connect the SDK, add the code:

`<script src="https://grandgames.net/sdk/games.js"></script>`

The script will create a global GrandGames object. SDK initialization is done asynchronously using `GrandGames.init()`:

Example:

```
  GrandGames.init()
     .then(function (sdk) {
         ...your code, for example window.sdk = sdk
     })
```

Or using async/await:

```
cosnt sdk: IGamesSdk = await window.GrandGames.init()
```

If your game is competitive, i.e. in it, during the game cycle, you need to score the maximum number of points from scratch in a limited period of time; it can be used in tournaments, which will increase its popularity on the portal.

For the convenience of developers, the SDK can determine in which environment the application was launched. And if you launched the game locally, outside of GrandGames, then all methods will work in debug mode. Instead of real actions, a simplified test implementation will be used. For example, methods that request data will return predefined information. Saving - will use localStorage, etc. Other methods, such as sending points or signals, display information in the console.

You can use any legal monetization methods in your game, such as advertising and in-game purchases.

The game must not contain any illegal materials or 18+ content.

The game must be packaged in an archive and have an index.html file in the root. The archive size is no more than 50Mb. If the game is only available remotely on your domain, embedding via iFrame without transferring the build is also possible. In addition to the game itself, you need the following information:

## Text

- Game name: up to 50 characters
- Short description: up to 250 characters
- Instructions on how to play and/or additional information about the game up to 1200 characters.
- Key phrases separated by commas up to 250 characters to improve visibility in searches.
- Optional:
  - developer name
  - a link to your website, or a game page on your website, etc.
  - link to the source code, if this is an OpenSource project

## Graphic

- Icon: PNG, square from 256x256 to 512x512 (bigger = better)
- Cover: WebP, 1020x240
- Picture for the catalogue: JPEG, rectangle. Ideally 800x470, but anything between 400x240 and 1024x512 will do. Visible proportions may vary, so it is advisable to have 10-20% safety zones around the edges of the image.

## Other

- Your login on GrandGames (it is advisable to register)
- List of supported languages. If there are several languages, it is advisable to also send text information for them, at least in English.
- Information about supported platforms (desktop, mobile, tablets)

For any questions, please contact here: https://grandgames.net/contact

Or, write in the comments: https://grandgames.net/games/add
