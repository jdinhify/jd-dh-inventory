export const getNumberValue = (value: string) =>
  Number(value.replace(/[.,]/g, ''))
