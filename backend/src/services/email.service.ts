import nodemailer from 'nodemailer';

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',  // selecionar service
      auth: {
        user: 'seu-email@gmail.com',  // Substitua pelo seu e-mail
        pass: 'sua-senha'  // Substitua pela sua senha ou use OAuth2
      }
    });
  }

  public sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'seu-email@gmail.com',
      to,
      subject,
      text
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}