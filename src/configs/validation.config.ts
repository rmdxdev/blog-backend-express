import { createValidationText } from '@/helpers'

export const VALIDATION = {
  descMinLength: 20,
  commentMinLength: 1,
  usernameMinLength: 4,
  passwordMinLength: 6,
  contentMinLength: 150,
  usernameMaxLength: 16,
  postTitleMinLength: 6
}

export const VALIDATION_MESSAGES = {
  email: 'The value must be a mail',
  array: 'The value must be an array',
  string: 'The value must be a string',
  object: 'The value must be an object',
  descMinLength: createValidationText(VALIDATION.descMinLength),
  titleMinLength: createValidationText(VALIDATION.postTitleMinLength),
  commentMinLength: createValidationText(VALIDATION.commentMinLength),
  contentMinLength: createValidationText(VALIDATION.contentMinLength),
  passwordMinLength: createValidationText(VALIDATION.passwordMinLength),
  usernameLength: `The value must contain between ${VALIDATION.usernameMinLength} and ${VALIDATION.usernameMaxLength} characters`
}
