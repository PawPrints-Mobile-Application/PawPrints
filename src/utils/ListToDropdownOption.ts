import { DropdownOption } from ".";

export default function ListToDropdownOption(list: Array<any>) {
  return list.map((option) => new DropdownOption(option.toString(), option));
}
