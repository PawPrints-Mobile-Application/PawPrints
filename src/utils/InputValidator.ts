import { HelperConstructor } from ".";

class InputValidator {
  callback: (value: any) => boolean;
  helper: HelperConstructor;

  public constructor(
    callback: (value: any) => boolean,
    helperText: string,
    intensity: "danger" | "warning"
  ) {
    this.callback = callback;
    this.helper = new HelperConstructor(helperText, intensity);
  }
}

export default InputValidator;
