export const VALIDATION = {
  descMinLength: 20,
  contentMinLength: 150,
  usernameMinLength: 4,
  usernameMaxLength: 16,
  passwordMinLength: 6,
  postTitleMinLength: 6,
  commentMinLength: 1
}

export const VALIDATION_MESSAGES = {
  string: 'The value must be a string',
  email: 'The value must be a mail',
  object: 'The value must be an object',
  array: 'The value must be an array',
  titleMinLength: `The value must contain at least ${VALIDATION.postTitleMinLength}`,
  commentMinLength: `The value must contain at least ${VALIDATION.commentMinLength}`,
  contentMinLength: `The value must contain at least ${VALIDATION.contentMinLength} characters`,
  descMinLength: `The value must contain at least ${VALIDATION.descMinLength} characters`,
  usernameLength: `The value must contain between ${VALIDATION.usernameMinLength} and ${VALIDATION.usernameMaxLength} characters`,
  passwordMinLength: `The value must contain at least ${VALIDATION.passwordMinLength} characters`
}
