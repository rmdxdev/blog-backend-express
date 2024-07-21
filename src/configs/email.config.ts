import { EmailTemplateMessages } from '@/helpers/send-email.helper'

export const EMAIL_TEMPLATE_MESSAGES: EmailTemplateMessages = {
  ru: {
    reset_password: 'Восстановить пароль',
    desc: 'Перейдите по ссылке для восстановления пароля. Если же, Вы не пытались восстановить пароль, просто проигнорируйте данное сообщение',
    rights: 'Все права защищены'
  },
  en: {
    reset_password: 'Reset password',
    desc: "Follow the link to recover your password. If you haven't tried to recover your password, just ignore this message",
    rights: 'All Rights Reserved'
  }
}
