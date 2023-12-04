export default function SeedGenerator(date?: Date) {
  if (!!date) return date[Symbol.toPrimitive]("number");
  return new Date()[Symbol.toPrimitive]("number");
}
