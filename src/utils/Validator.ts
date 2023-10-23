export default class Validator {
    callback: Function;
    helperText: string;
    intensity: 'danger' | 'warning';

    public constructor(callback: Function, helperText: string, intensity: 'danger' | 'warning') {
        this.callback = callback;
        this.helperText = helperText;
        this.intensity = intensity;
    }
}