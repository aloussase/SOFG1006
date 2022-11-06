export default class IllegalArgumentException extends Error {
  constructor(msg) {
    super(`IllegalArgumentException: ${msg}`);
  }
}
