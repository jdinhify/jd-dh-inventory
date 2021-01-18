import { getNumberValue } from './get-number-value'

describe(getNumberValue.name, () => {
  it.each([
    [111, '111'],
    [111000, '111.000'],
    [123456789, '123,456.789'],
    [NaN, '12af1'],
  ])('returns %d when value is "%s"', (expected, value) => {
    const actual = getNumberValue(value)

    expect(actual).toBe(expected)
  })
})
