type AppUser = {
  id: number
  login?: string
  avatar?: string
}

// All available languages on GrandGames
type AppLang =
  | 'ru'
  | 'en'
  | 'it'
  | 'hr'
  | 'sr'
  | 'uk'
  | 'de'
  | 'be'
  | 'fr'
  | 'pt'
  | 'es'
  | 'ja'
  | 'tr'

export type MainLang = 'ru' | 'en'

export enum EPlatformEvent {
  // Returning to the game, for example, after a pause
  RESUME = 'resume',
  // The game is interrupted by an external event, such as pressing pause in the window, or in the future - in the mobile client, when the application goes into the background
  PAUSE = 'pause',
  // The game is finished in a sports gaming mode, for example, in a tournament the opponent has already definitely won, or there is a time limit and continuing makes little sense.
  FINISH = 'finish',
}

export default interface IGamesSdk {
  /** SDK Initialization */
  initEnviroment(): Promise<void>

  /** Unique user identifier on the platform, determined at initialization, so available without a promise */
  getUserId(): number | null

  /** Full user information.
   * requireAuth - whether authorization is required.
   * Permission, if required, is requested regardless of this flag.
   * If not authorized, the response is Null.
   */
  getUser(requireAuth?: boolean): Promise<AppUser | null>

  /** Send arbitrary data to the player (WebSockets). Max 2 requests per second. If sid is not specified, then to all players */
  onEvent(event: EPlatformEvent, handler: () => void): void

  /** Tournament or duel. In this mode, you cannot show ads during active play, only at the beginning or end
   * and it's worth turning off hints and other auxiliary features */
  isSportMode(): boolean

  /** Expand/collapse to full screen. If not specified, change the current mode */
  fullScreen(mode?: boolean): Promise<void>

  /** Vibrate the device */
  vibro(ms?: number): void

  /** Get an arbitrary string */
  getItem(key: string): Promise<string | null>

  /** Save an arbitrary string.
   * It is an asynchronous wrapper over localStorage and is tied to the player's ID.
   * Data is stored locally in the browser. Do not use for storing player progress, level saves, etc.
   * Only for auxiliary data, such as settings, etc.
   */
  setItem(key: string, data: string): Promise<void>

  /** Remove an arbitrary string */
  removeItem(key: string): Promise<void>

  /** Popup message */
  toast(text: string): void

  /** Call when the game/puzzle is loaded and ready to interact */
  ready(): void

  /** Set the score and, if necessary, indicate that the player won, to avoid calling setWin */
  setScore(score: number, win?: boolean): void

  /** If the game has an ending, it must be called in case of defeat, or if the player intentionally interrupts the game using game means, for example, starts over */
  loose(): void

  /** Start the game, including the beginning after reloading */
  start(): void

  /** Victory in the game and its completion. Clears the save, a cup appears in the leaderboard. */
  setWin(): void

  /** The game can find out the current language for localization */
  getLang(): AppLang

  /** Backup language RU | EN if the game does not support the main one. RU for BY and UK. EN - for all others */
  getFallbackLang(): MainLang

  /** Delete the game save if it exists */
  clear(): Promise<void>

  /** Load the save. If there is no save, returns an error */
  load(): Promise<Object>

  /** Save game progress
   * Use to save completed levels, current solution/game status, etc.
   * Saved on the server for an authorized player and available later on any device.
   * For an unauthorized player, the data is stored in localStorage in encoded format
   */
  save(data: Object): Promise<void>

  /** Spend in-game hint.
   * Error - hints are completely unavailable, for example, the player is not logged in or the game is launched in sports mode.
   * false - the player has no more hints
   */
  spendTip(): Promise<boolean>
}
