import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman } = data.result;
    const { recipient } = data.result;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Agendamento de servico',
      template: 'delivery',
      context: {
        provider: deliveryman.name,
        user: recipient.name,
        product: data.result.product,
      },
    });
  }
}

export default new DeliveryMail();
