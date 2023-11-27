export default class DropdownOption {
    icon?: string;
    value: any;
    label: string;

    constructor(label: string, value?: any, icon?: string) {
        this.label = label;
        this.icon = icon;
        if (!value) this.value = this.label;
        else this.value = value;
    }
}