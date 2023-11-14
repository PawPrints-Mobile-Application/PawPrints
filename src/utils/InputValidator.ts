import { HelperConstructor } from ".";

class InputValidator {
  callback: (value: string) => boolean;
  helper: HelperConstructor;

  public constructor(
    callback: (value: string) => boolean,
    helperText: string,
    intensity: "danger" | "warning"
  ) {
    this.callback = callback;
    this.helper = new HelperConstructor(helperText, intensity);
  }
}

export default InputValidator;
