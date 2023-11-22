export default function StringToArray(value: string, splitter: string = "") {
  let temp = value.split(splitter);
  if (temp.length === 1 && temp[0] === '') temp = [];
  return temp;
}
