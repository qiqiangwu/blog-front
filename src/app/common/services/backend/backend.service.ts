import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/user/models/user';
import { environment } from 'src/environments/environment';
import { getGeneralApiProblem } from '../../utils/api/api-problem';
import { UtilsService } from '../utils/utils.service';
import {
  AddCatalogResult,
  CreateArticleParams,
  CreateArticleResult,
  GetArticleListParams,
  GetArticleListResult,
  GetCatalogListResult,
  GetHomeArticleListParams,
  GetHomeArticleListResult,
  SignInResult,
  UpdateArticleParams,
  UpdateArticleResult,
  UpdateCatalogResult,
  UpdateCatalogParams,
  DeleteCatalogResult,
  SignOutResult,
  DeleteArticleResult,
  GetArticleDetailResult,
} from './backend-api.types';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private static readonly TAG = 'BackendService';

  private get path() {
    if (environment.production) {
      return 'http://www.wuqiqiang.cn/api';
    } else {
      return 'http://127.0.0.1:7001';
    }
  }

  constructor(
    private logger: Logger,
    private http: HttpClient,
    private utils: UtilsService
  ) {}

  signIn(account: string, password: string): Observable<SignInResult> {
    return this.http
      .post(
        `${this.path}/auth/signin`,
        {
          account,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(
        map(
          (res: {
            code: number;
            message: string;
            data: { token: string; user: User };
          }) => {
            if (res.code === 2000001) {
              return {
                kind: 'ok' as const,
                token: res.data.token,
                user: res.data.user,
              };
            } else {
              return {
                kind: 'bad-data' as const,
                message: res.message,
              };
            }
          }
        ),
        catchError((e) => {
          const problem = getGeneralApiProblem(e, this.logger);
          if (problem) {
            return of(problem);
          }

          return of({
            kind: 'bad-data' as const,
            message: e.message || '未知错误',
          });
        })
      );
  }

  signOut(): Observable<SignOutResult> {
    return this.http.get(`${this.path}/auth/signout`).pipe(
      map((res: { code: number; message: string }) => {
        if (res.code === 2000001) {
          return {
            kind: 'ok' as const,
          };
        } else {
          return {
            kind: 'bad-data' as const,
            message: res.message,
          };
        }
      }),
      catchError((e) => {
        const problem = getGeneralApiProblem(e, this.logger);
        if (problem) {
          return of(problem);
        }

        return of({
          kind: 'bad-data' as const,
          message: e.message || '未知错误',
        });
      })
    );
  }

  getCatalogList(): Observable<GetCatalogListResult> {
    return this.http.get(`${this.path}/article/catalog`).pipe(
      map((res: { code: number; message: string; data: { data } }) => {
        if (res.code === 2000001) {
          return {
            kind: 'ok' as const,
            list: res.data.data,
          };
        } else {
          return {
            kind: 'bad-data' as const,
            message: res.message,
          };
        }
      }),
      catchError((e) => {
        const problem = getGeneralApiProblem(e, this.logger);
        if (problem) {
          return of(problem);
        }

        return of({
          kind: 'bad-data' as const,
          message: e.message || '未知错误',
        });
      })
    );
  }

  addCatalog(name: string): Observable<AddCatalogResult> {
    return this.http
      .post(
        `${this.path}/article/catalog`,
        {
          name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(
        map(
          (res: {
            code: number;
            message: string;
            data: { id; name; errors };
          }) => {
            if (res.code === 2000001) {
              return {
                kind: 'ok' as const,
                catalog: {
                  id: res.data.id,
                  name: res.data.name,
                },
              };
            } else {
              return {
                kind: 'bad-data' as const,
                message: res.message,
              };
            }
          }
        ),
        catchError((e) => {
          const problem = getGeneralApiProblem(e, this.logger);
          if (problem) {
            return of(problem);
          }

          return of({
            kind: 'bad-data' as const,
            message: e.message || '未知错误',
          });
        })
      );
  }

  updateCatalog(params: UpdateCatalogParams): Observable<UpdateCatalogResult> {
    return this.http
      .put(
        `${this.path}/article/catalog/${params.id}`,
        { name: params.name },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(
        map((res: { code: number; message: string }) => {
          if (!res) {
            return {
              kind: 'ok' as const,
            };
          } else {
            return {
              kind: 'bad-data' as const,
              message: res.message,
            };
          }
        }),
        catchError((e) => {
          const problem = getGeneralApiProblem(e, this.logger);
          if (problem) {
            return of(problem);
          }

          return of({
            kind: 'bad-data' as const,
            message: e.message || '未知错误',
          });
        })
      );
  }

  deleteCatalog(id: string): Observable<DeleteCatalogResult> {
    return this.http.delete(`${this.path}/article/catalog/${id}`).pipe(
      map((res: { code: number; message: string }) => {
        if (!res) {
          return {
            kind: 'ok' as const,
          };
        } else {
          return {
            kind: 'bad-data' as const,
            message: res.message,
          };
        }
      }),
      catchError((e) => {
        const problem = getGeneralApiProblem(e, this.logger);
        if (problem) {
          return of(problem);
        }

        return of({
          kind: 'bad-data' as const,
          message: e.message || '未知错误',
        });
      })
    );
  }

  /**
   * 新增文章
   */
  createArticle(params: CreateArticleParams): Observable<CreateArticleResult> {
    return this.http
      .post(
        `${this.path}/articles`,
        {
          ...params,
          catalog: params.catalog.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(
        map((res: { code: number; message: string; data: { id } }) => {
          if (res.code === 2000001) {
            return {
              kind: 'ok' as const,
              article: {
                ...params,
                id: res.data.id,
              },
            };
          } else {
            return {
              kind: 'bad-data' as const,
              message: res.message,
            };
          }
        }),
        catchError((e) => {
          const problem = getGeneralApiProblem(e, this.logger);
          if (problem) {
            return of(problem);
          }

          return of({
            kind: 'bad-data' as const,
            message: e.message || '未知错误',
          });
        })
      );
  }

  /**
   * 获取文章列表
   */
  GetArticleList(
    params: GetArticleListParams
  ): Observable<GetArticleListResult> {
    return this.http
      .get(`${this.path}/articles?${this.utils.jsonToQueryString(params)}`)
      .pipe(
        map(
          (res: {
            code: number;
            message: string;
            data: { data; pageSize; count };
          }) => {
            if (res.code === 2000001) {
              return {
                kind: 'ok' as const,
                list: res.data.data,
                pageSize: res.data.pageSize,
                count: res.data.count,
              };
            } else {
              return {
                kind: 'bad-data' as const,
                message: res.message,
              };
            }
          }
        ),
        catchError((e) => {
          const problem = getGeneralApiProblem(e, this.logger);
          if (problem) {
            return of(problem);
          }

          return of({
            kind: 'bad-data' as const,
            message: e.message || '未知错误',
          });
        })
      );
  }

  /**
   * 更新文章
   */
  updateArticle(
    id: string,
    params: UpdateArticleParams
  ): Observable<UpdateArticleResult> {
    return this.http
      .put(
        `${this.path}/articles/${id}`,
        {
          ...params,
          catalog: params.catalog.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(
        map((res: { code: number; message: string }) => {
          if (!res) {
            return {
              kind: 'ok' as const,
            };
          } else {
            return {
              kind: 'bad-data' as const,
              message: res.message,
            };
          }
        }),
        catchError((e) => {
          const problem = getGeneralApiProblem(e, this.logger);
          if (problem) {
            return of(problem);
          }

          return of({
            kind: 'bad-data' as const,
            message: e.message || '未知错误',
          });
        })
      );
  }

  deleteArticle(id: string): Observable<DeleteArticleResult> {
    return this.http.delete(`${this.path}/articles/${id}`).pipe(
      map((res: { code: number; message: string }) => {
        if (!res) {
          return {
            kind: 'ok' as const,
          };
        } else {
          return {
            kind: 'bad-data' as const,
            message: res.message,
          };
        }
      }),
      catchError((e) => {
        const problem = getGeneralApiProblem(e, this.logger);
        if (problem) {
          return of(problem);
        }

        return of({
          kind: 'bad-data' as const,
          message: e.message || '未知错误',
        });
      })
    );
  }

  /**
   * 获取文章详情
   * @param id
   */
  getArticleDetail(id: string): Observable<GetArticleDetailResult> {
    return this.http.get(`${this.path}/articles/${id}`).pipe(
      map((res: { code: number; message: string; data: { article } }) => {
        if (res.code === 2000001) {
          return {
            kind: 'ok' as const,
            article: res.data.article,
          };
        } else {
          return {
            kind: 'bad-data' as const,
            message: res.message,
          };
        }
      }),
      catchError((e) => {
        const problem = getGeneralApiProblem(e, this.logger);
        if (problem) {
          return of(problem);
        }

        return of({
          kind: 'bad-data' as const,
          message: e.message || '未知错误',
        });
      })
    );
  }

  /**
   * 首页获取文章列表
   */
  GetHomeArticleList(
    params: GetHomeArticleListParams
  ): Observable<GetHomeArticleListResult> {
    const paramsString = this.utils.jsonToQueryString(params);
    return this.http
      .get(
        `${this.path}/home/articles` + (paramsString ? `?${paramsString}` : '')
      )
      .pipe(
        map(
          (res: {
            code: number;
            message: string;
            data: { data; pageSize; count };
          }) => {
            if (res.code === 2000001) {
              return {
                kind: 'ok' as const,
                list: res.data.data,
                pageSize: res.data.pageSize,
                count: res.data.count,
              };
            } else {
              return {
                kind: 'bad-data' as const,
                message: res.message,
              };
            }
          }
        ),
        catchError((e) => {
          const problem = getGeneralApiProblem(e, this.logger);
          if (problem) {
            return of(problem);
          }

          return of({
            kind: 'bad-data' as const,
            message: e.message || '未知错误',
          });
        })
      );
  }
}
