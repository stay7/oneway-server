import { Params } from 'nestjs-pino';
import { Request, Response } from 'express';

const serializer = {
  req: (req: Request) => {
    return {
      url: req.url,
      method: req.method,
      params: req.params,
      headers: {
        authorization: req.headers['authorization'],
      },
    };
  },
  res: (res: Response) => {
    return {
      statusCode: res.statusCode,
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
