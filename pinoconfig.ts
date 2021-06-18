import { Params } from 'nestjs-pino';
import pino from 'pino';

const serializer = {
  req: (req: Request) => {
    return {
      url: req.url,
      method: req['method'],
      params: req['params'],
      headers: {
        contentType: req.headers['content-type'],
        authorization: req.headers['authorization'],
      },
    };
  },
  err: pino.stdSerializers.err,
  res: (res: Response) => {
    return {
      statusCode: res['statusCode'],
      message: res['message'],
      error: res['error'],
    };
  },
};

const config: Params = {
  pinoHttp: {
    prettyPrint: { colorize: true, levelFirst: true },
    serializers: serializer,
    wrapSerializers: true,
  },
};

export default config;
