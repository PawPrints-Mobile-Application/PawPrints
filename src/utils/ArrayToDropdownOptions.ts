import { DropdownOption } from ".";

export default function ArrayToDropdownOptions(list: Array<any>) {
  return list.map((option) => new DropdownOption(option.toString(), option));
}
