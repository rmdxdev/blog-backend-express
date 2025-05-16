import { EMAIL_TEMPLATE_MESSAGES } from '@/configs'
import { CLIENT_URL } from '@/constants'
import { SendMailOptions, createTransport } from 'nodemailer'
import hbs, { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars'
import * as path from 'path'

interface EmailParams {
  body: string
  lang: string
  email: string
  subject: string
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
  desc: string
  rights: string
  reset_password: string
}

export type EmailTemplateMessages = Record<string, EmailMessages>

const viewsFolderPath = path.resolve(__dirname, '../views')
const handlebarOptions: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    extname: '.view.hbs',
    defaultLayout: false,
    partialsDir: viewsFolderPath
  },
  extName: '.view.hbs',
  viewPath: viewsFolderPath
}

export const sendEmail = async (data: EmailParams) => {
  const transporter = createTransport({
    secure: false,
    port: Number(process.env.SMTP_PORT),
    service: String(process.env.SMTP_SERVICE),
    auth: {
      user: String(process.env.SMTP_EMAIL),
      pass: String(process.env.SMTP_PASSWORD)
    }
  })

  const options: EmailOptions = {
    to: data.email,
    template: 'email',
    subject: data.subject,
    from: `Blog App: ${process.env.SMTP_EMAIL}`,
    context: {
      url: CLIENT_URL,
      link: data.body,
      messages: {
        desc: EMAIL_TEMPLATE_MESSAGES[data.lang].desc,
        rights: EMAIL_TEMPLATE_MESSAGES[data.lang].rights,
        reset_password: EMAIL_TEMPLATE_MESSAGES[data.lang].reset_password
      }
    }
  }

  transporter.use('compile', hbs(handlebarOptions))
  await transporter.sendMail(options)
}
