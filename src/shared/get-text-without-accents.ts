// https://stackoverflow.com/a/37511463/2617164
export const getTextWithoutAccents = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
