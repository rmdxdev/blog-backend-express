import { createValidationText } from '@/helpers'

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
  titleMinLength: createValidationText(VALIDATION.postTitleMinLength),
  commentMinLength: createValidationText(VALIDATION.commentMinLength),
  contentMinLength: createValidationText(VALIDATION.contentMinLength),
  descMinLength: createValidationText(VALIDATION.descMinLength),
  usernameLength: `The value must contain between ${VALIDATION.usernameMinLength} and ${VALIDATION.usernameMaxLength} characters`,
  passwordMinLength: createValidationText(VALIDATION.passwordMinLength)
}
