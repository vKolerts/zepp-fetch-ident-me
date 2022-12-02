import { MessageBuilder } from '../shared/message'

const messageBuilder = new MessageBuilder();

const fetchTemps = async (ctx) => {
  try {
    // Requesting network data using the fetch API
    const res = await fetch({
      url: 'http://192.168.1.218',
      method: 'GET'
    });

    ctx.response({
      data: res.body,
    });
  }
  catch (error) {
    console.log('fetchTemps.failed', error);
    ctx.response({
      data: {
        error,
      },
    });
  }
}

AppSideService({
  onInit() {
    messageBuilder.listen(() => { })

    messageBuilder.on('request', (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload)
      if (jsonRpc.method === 'GET_TEMPS') {
        return fetchTemps(ctx)
      }
    })
  },

  onRun() {
  },

  onDestroy() {
  }
});
