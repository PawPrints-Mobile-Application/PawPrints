import { HelperConstructor } from ".";

class InputValidator {
  callback: (value: string | number) => boolean;
  helper: HelperConstructor;

  public constructor(
    callback: (value: string | number) => boolean,
    helperText: string,
    intensity: "danger" | "warning"
  ) {
    this.callback = callback;
    this.helper = new HelperConstructor(helperText, intensity);
  }
}

export default InputValidator;
