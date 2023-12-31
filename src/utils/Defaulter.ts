export default (
  value: any,
  defaultValue: any = null,
  condition: (value: any) => boolean = (value: any) => !!value
) => (condition(value) ? value : defaultValue);
