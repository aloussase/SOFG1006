import * as _ from "lodash";

import IllegalArgumentException from "./IllegalArgumentException.js";

class NonEmptyString {
  constructor(string) {
    this.string = string;
  }

  toString() {
    return this.string;
  }
}

export default function createNonEmptyString(string) {
  if (!_.isString(string)) {
    throw new IllegalArgumentException(
      `Expected string but got: ${typeof string}`
    );
  }

  if (_.isEmpty(string)) {
    throw new IllegalArgumentException(`String was empty!`);
  }

  return Object.freeze(new NonEmptyString(string));
}
