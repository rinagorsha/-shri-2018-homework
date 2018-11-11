// tslint:disable-next-line
declare global {
  // tslint:disable-next-line
  interface Window {
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}