import Mail from '../../lib/Mail';

class Cancellation {
  get key() {
    return 'Cancellation';
  }

  async handle({ data }) {
    const { deliveryman } = data.delivery;
    const { recipient } = data.delivery;
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Cancelamente de servico',
      template: 'cancellation',
      context: {
        provider: deliveryman.name,
        user: recipient.name,
        product: data.delivery.product,
      },
    });
  }
}

export default new Cancellation();
