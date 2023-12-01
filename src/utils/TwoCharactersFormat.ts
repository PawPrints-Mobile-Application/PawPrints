export default function TwoCharactersFormat(value: number) {
  return value < 10 ? `0${value}` : value;
}
