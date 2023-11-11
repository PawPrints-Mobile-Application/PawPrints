export default function SeedGenerator(date?: Date) {
  if (!!date) date[Symbol.toPrimitive]("number");
  return new Date()[Symbol.toPrimitive]("number");
}
