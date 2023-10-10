import { User } from '../../../User/model/types/user';

export enum ArticleSortField {
  VIEW = 'view',
  TITLE = 'title',
  CREATED = 'createdAt'
}


export enum ArticleBlockType {

  CODE = 'CODE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
}
export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}
export interface ArticleImageBlock extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE;
  src: string;
  title: string;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE;
  code: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT;
  title?: string;
  paragraphs: string[];
}

export type ArticleBlock = ArticleImageBlock | ArticleTextBlock | ArticleCodeBlock;

export enum ArticleType {
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  ECONOMICS = 'ECONOMICS',
  ALL = 'ALL'
}
export enum ArticleView {
  BIG = 'BIG',
  SMALL = 'SMALL',
}
export interface Article {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  user:User;
  type: ArticleType[];
  blocks: ArticleBlock[];
}
