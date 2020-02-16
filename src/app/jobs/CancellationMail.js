import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    // const { value } = data;
    console.log('A FILA EXECUTOU ', data);
    await Mail.sendMail({
      to: `Junior <jozimarjo@gmail.com>`,
      subject: 'Agendamento de servico',
      template: 'cancellation',
      context: {
        provider: 'Jozimar',
        user: 'marcelly',
        // date: format(hourStart, "'dia' dd 'de' MMMM', as' H:mm'h'", {
        // locale: pt,
        // }),
      },
    });
  }
}

export default new CancellationMail();
