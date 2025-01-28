import { Request, Response } from 'express';
import { EmailService } from '../services/email.service';

export class EmailController {

   private emailService: EmailService; 
  
    constructor() {
      this.emailService = new EmailService();
    }

  public async sendAbandonedCartEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.body;  

    try {
      const subject = 'Você esqueceu alguns itens no seu carrinho!';
      const text = 'Olá, vimos que você deixou alguns itens no seu carrinho. Não perca a chance de finalizar a sua compra!';
      
      await this.emailService.sendEmail(email, subject, text);
      res.status(200).send({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
      res.status(500).send({ message: 'Erro ao enviar o e-mail', error });
    }
  }
}