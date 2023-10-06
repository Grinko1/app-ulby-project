import { EntityState } from "@reduxjs/toolkit";
import { ArticleView } from "entities/Article";
import { Article } from "entities/Comment/model/types/article";


export interface ArticlePageSchema extends EntityState<Article> {
    isLoading?:boolean
    error?:string

    view: ArticleView
}