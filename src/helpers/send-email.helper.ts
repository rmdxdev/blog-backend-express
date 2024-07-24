import { EMAIL_TEMPLATE_MESSAGES } from '@/configs'
import { CLIENT_URL } from '@/constants'
import { SendMailOptions, createTransport } from 'nodemailer'
import hbs, { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars'
import * as path from 'path'

interface EmailParams {
  email: string
  subject: string
  body: string
  lang: string
}

interface EmailOptions extends SendMailOptions {
  template: string
  context: {
    url: string
    link: string
    messages: Record<keyof EmailMessages, string>
  }
}

interface EmailMessages {
  reset_password: string
  desc: string
  rights: string
}

export type EmailTemplateMessages = Record<string, EmailMessages>

const viewsFolderPath = path.resolve(__dirname, '../views')
const handlebarOptions: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    extname: '.view.hbs',
    partialsDir: viewsFolderPath,
    defaultLayout: false
  },
  extName: '.view.hbs',
  viewPath: viewsFolderPath
}

export const sendEmail = async (data: EmailParams) => {
  const transporter = createTransport({
    service: String(process.env.SMTP_SERVICE),
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: String(process.env.SMTP_EMAIL),
      pass: String(process.env.SMTP_PASSWORD)
    }
  })

  const options: EmailOptions = {
    from: `Blog App: ${process.env.SMTP_EMAIL}`,
    to: data.email,
    subject: data.subject,
    template: 'email',
    context: {
      url: CLIENT_URL,
      link: data.body,
      messages: {
        reset_password: EMAIL_TEMPLATE_MESSAGES[data.lang].reset_password,
        desc: EMAIL_TEMPLATE_MESSAGES[data.lang].desc,
        rights: EMAIL_TEMPLATE_MESSAGES[data.lang].rights
      }
    }
  }

  transporter.use('compile', hbs(handlebarOptions))
  await transporter.sendMail(options)
}
