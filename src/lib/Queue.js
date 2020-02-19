import Bee from 'bee-queue';
import DeliveryMail from '../app/jobs/DeliveryMail';
import Cancellation from '../app/jobs/Cancellation';
import redisConfig from '../config/redis';

const jobs = [DeliveryMail, Cancellation];
class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    // console.log('queue: ', queue);
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.process(handle);
    });
  }
}

export default new Queue();
