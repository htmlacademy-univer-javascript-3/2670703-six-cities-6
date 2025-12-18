import { createReducer, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import { setComments, fetchCommentsAction, submitCommentAction } from '../action';
import type { Review } from '../../components/review-item/review-item';

export type CommentsState = {
  comments: Review[];
  isCommentsLoading: boolean;
  isCommentSubmitting: boolean;
};

const initialState: CommentsState = {
  comments: [],
  isCommentsLoading: false,
  isCommentSubmitting: false,
};

export const commentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setComments, (state, action: PayloadAction<Review[]>) => {
      state.comments = action.payload;
    })
    .addMatcher(isAnyOf(fetchCommentsAction.pending), (state) => {
      state.isCommentsLoading = true;
    })
    .addMatcher(isAnyOf(fetchCommentsAction.fulfilled), (state, action: PayloadAction<Review[]>) => {
      state.isCommentsLoading = false;
      state.comments = action.payload;
    })
    .addMatcher(isAnyOf(fetchCommentsAction.rejected), (state) => {
      state.isCommentsLoading = false;
    })
    .addMatcher(isAnyOf(submitCommentAction.pending), (state) => {
      state.isCommentSubmitting = true;
    })
    .addMatcher(isAnyOf(submitCommentAction.fulfilled), (state, action: PayloadAction<Review>) => {
      state.isCommentSubmitting = false;
      state.comments.push(action.payload);
    })
    .addMatcher(isAnyOf(submitCommentAction.rejected), (state) => {
      state.isCommentSubmitting = false;
    });
});
