class HelperConstructor {
  text: string;
  intensity: "warning" | "danger";

  constructor(text: string, intensity: "warning" | "danger") {
    this.text = text;
    this.intensity = intensity;
  }
}

export default HelperConstructor;
