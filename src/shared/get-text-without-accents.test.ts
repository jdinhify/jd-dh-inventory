import { getTextWithoutAccents } from './get-text-without-accents'

describe(getTextWithoutAccents.name, () => {
  it('returns text without accents/strokes', () => {
    const text =
      'à á ả ã ạ ă ằ ắ ẳ ẵ ặ â ầ ấ ẩ ẫ ậ è é ẻ ẽ ẹ ê ề ế ể ễ ệ ì í ỉ ĩ ị ò ó ỏ õ ọ ơ ờ ớ ở ỡ ợ ô ồ ố ổ ỗ ộ ù ú ủ ũ ụ ư ừ ứ ử ữ ự đ Đ'
    const expected =
      'a a a a a a a a a a a a a a a a a e e e e e e e e e e e i i i i i o o o o o o o o o o o o o o o o o u u u u u u u u u u u d D'
    const actual = getTextWithoutAccents(text)

    expect(actual).toBe(expected)
  })
})
