import slugify from "@sindresorhus/slugify"

export default (val) =>
  slugify(val, {
    separator: "_",
    lowercase: true,
    decamelize: true,
    preserveLeadingUnderscore: false,
    preserveTrailingDash: false,
  })
