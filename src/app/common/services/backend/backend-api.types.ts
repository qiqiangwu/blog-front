import { User } from 'src/app/user/models/user';
import { OperateState } from '../../types/operate-state';
import { GeneralApiProblem } from '../../utils/api/api-problem';

/**
 * signIn
 */
export type SignInResult =
  | { kind: 'ok'; token: string; user: User }
  | GeneralApiProblem;

/**
 * 退出登录
 */
export type SignOutResult = { kind: 'ok' } | GeneralApiProblem;

/**
 * getCatalogList
 */
export interface Catalog {
  name: string;
  id: string;
}
export type GetCatalogListResult =
  | { kind: 'ok'; list: Catalog[] }
  | GeneralApiProblem;

/**
 * addCatalogResult
 */
export type AddCatalogResult =
  | { kind: 'ok'; catalog: Catalog }
  | GeneralApiProblem;

/**
 * 修改文章类别
 */
export interface UpdateCatalogParams {
  id: string;
  name: string;
}
export type UpdateCatalogResult = { kind: 'ok' } | GeneralApiProblem;

/**
 * 删除文章类别
 */
export type DeleteCatalogResult = { kind: 'ok' } | GeneralApiProblem;

/**
 * 新增文章
 */
export interface Article {
  id: string;
  title: string;
  state: OperateState;
  stick?: boolean;
  order?: number;
  content?: string;
  catalog: Catalog;
  tags?: string[];
  abstract?: string;
  author?: { name: string };
  updatedAt?: string;
}
export interface CreateArticleParams {
  title: string;
  state: OperateState;
  stick?: boolean;
  order?: number;
  content?: string;
  catalog: Catalog;
  tags?: string[];
}
export type CreateArticleResult =
  | { kind: 'ok'; article: Article }
  | GeneralApiProblem;

/**
 * 获取文章列表
 */
export interface GetArticleListParams {
  catalogId: string;
  pageSize: number;
  lastArticleId?: string;
}
export type GetArticleListResult =
  | { kind: 'ok'; list: Article[]; pageSize: number; count: number }
  | GeneralApiProblem;

/**
 * 更新文章
 */
export interface UpdateArticleParams {
  title: string;
  state: OperateState;
  stick?: boolean;
  order?: number;
  content?: string;
  catalog: Catalog;
  tags?: string[];
}
export type UpdateArticleResult = { kind: 'ok' } | GeneralApiProblem;

// 首页文章列表
export interface GetHomeArticleListParams {
  id?: string;
  dir?: 'prev' | 'next';
  pageSize?: number;
}
export type GetHomeArticleListResult =
  | { kind: 'ok'; list: Article[]; pageSize: number; count: number }
  | GeneralApiProblem;

/**
 * 删除文章
 */
export type DeleteArticleResult = { kind: 'ok' } | GeneralApiProblem;
/**
 * 获取文章详情
 */
export type GetArticleDetailResult =
  | { kind: 'ok'; article: Article }
  | GeneralApiProblem;
