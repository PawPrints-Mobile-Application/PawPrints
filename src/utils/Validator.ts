export default class Validator {
    callback: (value: string) => boolean;
    helperText: string;
    intensity: 'danger' | 'warning';

    public constructor(callback: (value: string) => boolean, helperText: string, intensity: 'danger' | 'warning') {
        this.callback = callback;
        this.helperText = helperText;
        this.intensity = intensity;
    }
}