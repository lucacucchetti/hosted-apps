import { LambdaFunctionUrlEvent } from './types/LambdaFunctionUrlEvent';

export const handler = async (event: LambdaFunctionUrlEvent) => {
  console.log('Handling movie');
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world',
    }),
  };
};
