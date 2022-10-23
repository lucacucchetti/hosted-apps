/**
 * Unfortunately I haven't found the right type definition for a Lambda Function being invoked directly through it's URL.
 *
 * An example of what we get:
 *
 *
 * 2022-09-25T19:45:15.753Z	02f41aac-28b1-4793-aa41-29134b136242	INFO	{
 *  version: '2.0',
 *  routeKey: '$default',
 *  rawPath: '/',
 *  rawQueryString: '',
 *  headers: {
 *    'x-forwarded-proto': 'https',
 *    'x-forwarded-port': '443',
 *    ...
 *  },
 *  requestContext: {
 *    accountId: 'anonymous',
 *    http: {
 *      method: 'GET',
 *      path: '/',
 *      protocol: 'HTTP/1.1',
 *    },
 *    requestId: '02f41aac-28b1-4793-aa41-29134b136242',
 *    routeKey: '$default',
 *    stage: '$default',
 *    time: '25/Sep/2022:19:45:15 +0000',
 *    timeEpoch: 1664135115483
 *  },
 *  isBase64Encoded: false
 *}
 *
 */

interface LambdaFunctionUrlEventRequestContextHttp {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
}

interface LambdaFunctionUrlEventRequestContext {
  http: any;
}

export interface LambdaFunctionUrlEvent {
  requestContext: LambdaFunctionUrlEventRequestContext;
}
