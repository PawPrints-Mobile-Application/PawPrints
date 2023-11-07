import InputBox from "./InputBox.vue";
import InputLabel from "./InputLabel.vue";
import InputHelper from "./InputHelper.vue";
import InputText from "./InputText.vue";
import InputSelect from "./InputSelect.vue";
import InputDropdown from "./InputDropdown.vue";
import InputDate from "./InputDate.vue";
import InputCalendar from "./InputCalendar.vue";
import InputColorPicker from "./InputColorPicker.vue";
import InputColor from "./InputColor.vue";
import InputButtonPhoto from "./InputButtonPhoto.vue";
import InputPhoto from "./InputPhoto.vue";
import InputRadio from "./InputRadio.vue";
import InputCheckbox from "./InputCheckbox.vue";

class HelperConstructor {
  text: string;
  intensity: 'warning' | 'danger';

  constructor(text: string, intensity: 'warning' | 'danger') {
    this.text = text;
    this.intensity = intensity;
  }
}

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


export {
  InputBox,
  InputLabel,
  InputHelper,
  InputText,
  InputSelect,
  InputDropdown,
  InputDate,
  InputCalendar,
  InputColorPicker,
  InputColor,
  InputButtonPhoto,
  InputPhoto,
  InputRadio,
  InputCheckbox,

  HelperConstructor,
  InputValidator
};
