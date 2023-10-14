import { combineReducers } from 'redux';
import { articleDetailsCommentReducer } from './ArticleDetailsCommentSlice';
import { articleDetailsRecommendReducer } from './ArticleDetailsRecommendSlice';
import { ArticleDetailsPageSchema } from '../types';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  comments: articleDetailsCommentReducer,
  recommendations: articleDetailsRecommendReducer,
});
