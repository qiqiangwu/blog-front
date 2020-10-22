import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError } from 'rxjs';
import { Logger } from '@nsalaun/ng-logger';

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: 'timeout'; temporary: true; message?: string }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: 'cannot-connect'; temporary: true; message?: string }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: 'server'; message?: string; errors?: any }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: 'unauthorized'; message?: string }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: 'forbidden'; message?: string }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: 'not-found'; message?: string }
  /**
   * All other 4xx series errors.
   */
  | { kind: 'rejected'; message?: string }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: 'unknown'; temporary: true; message?: string }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: 'bad-data'; message?: string; errors?: any }
  /**
   * Empty data
   */
  | { kind: 'empty-data'; message?: string }
  /**
   * Conflict. This is 409
   */
  | { kind: 'conflict'; message?: string };

export function getProblemDescription(kind, desc?: string) {
  switch (kind) {
    case 'ok':
      return desc || '获取数据成功';
    case 'empty-data':
      return desc || '还没有添加数据';
    default:
      return desc || '出错啦';
  }
}

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(
  response: HttpErrorResponse | TimeoutError,
  logger: Logger
): GeneralApiProblem | void {
  logger.group('接口请求报错');
  logger.error(response);
  logger.groupEnd();

  if (response instanceof TimeoutError) {
    return { kind: 'timeout', message: '网络访问超时', temporary: true };
  } else {
    if (response.error instanceof ErrorEvent) {
    } else {
      const message = response.error && response.error.message;
      const errors =
        response.error && response.error.data && response.error.data.errors;

      switch (response.statusText) {
        case 'Internal Server Error':
          return {
            kind: 'server',
            message: message || '服务端错误',
            errors: errors,
          };
        case 'Unauthorized':
          return { kind: 'unauthorized', message: message || '没有权限' };
        case 'Forbidden':
          return { kind: 'forbidden', message: message || '服务器拒绝' };
        case 'Not Found':
          return { kind: 'not-found', message: message || '请求不存在' };
        case 'Conflict':
          return { kind: 'conflict', message: message || '重复添加' };
        case 'Unknown Error':
          return {
            kind: 'unknown',
            temporary: true,
            message: message || '未知错误',
          };
      }
    }
  }

  return null;
}
