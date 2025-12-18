import { describe, it, expect } from 'vitest';
import { commentsReducer, type CommentsState } from './comments-reducer';
import {
  fetchCommentsAction,
  setComments,
  submitCommentAction
} from '../action';
import type { Review } from '../../components/review-item/review-item';
import { createMockReview } from '../../test-utils/mocks';

const createInitialState = (overrides?: Partial<CommentsState>): CommentsState => ({
  comments: [],
  isCommentsLoading: false,
  isCommentSubmitting: false,
  ...overrides
});

describe('commentsReducer', () => {
  it('should return initial state for unknown action', () => {
    const state = commentsReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(createInitialState());
  });

  it('should set comments with setComments action', () => {
    const comments: Review[] = [createMockReview({ id: 1 }), createMockReview({ id: 2 })];
    const initialState = createInitialState();

    const state = commentsReducer(initialState, setComments(comments));

    expect(state.comments).toEqual(comments);
  });

  it('should handle fetchCommentsAction.pending', () => {
    const initialState = createInitialState({ isCommentsLoading: false });

    const state = commentsReducer(initialState, { type: fetchCommentsAction.pending.type });

    expect(state.isCommentsLoading).toBe(true);
  });

  it('should handle fetchCommentsAction.fulfilled', () => {
    const comments: Review[] = [createMockReview({ id: 1 })];
    const initialState = createInitialState({
      isCommentsLoading: true,
      comments: []
    });

    const state = commentsReducer(initialState, {
      type: fetchCommentsAction.fulfilled.type,
      payload: comments
    });

    expect(state.isCommentsLoading).toBe(false);
    expect(state.comments).toEqual(comments);
  });

  it('should handle fetchCommentsAction.rejected', () => {
    const initialState = createInitialState({ isCommentsLoading: true });

    const state = commentsReducer(initialState, { type: fetchCommentsAction.rejected.type });

    expect(state.isCommentsLoading).toBe(false);
  });

  it('should handle submitCommentAction.pending', () => {
    const initialState = createInitialState({ isCommentSubmitting: false });

    const state = commentsReducer(initialState, { type: submitCommentAction.pending.type });

    expect(state.isCommentSubmitting).toBe(true);
  });

  it('should handle submitCommentAction.fulfilled', () => {
    const existingComment = createMockReview({ id: 1 });
    const newComment = createMockReview({ id: 2 });
    const initialState = createInitialState({
      comments: [existingComment],
      isCommentSubmitting: true
    });

    const state = commentsReducer(initialState, {
      type: submitCommentAction.fulfilled.type,
      payload: newComment
    });

    expect(state.isCommentSubmitting).toBe(false);
    expect(state.comments).toHaveLength(2);
    expect(state.comments[1]).toEqual(newComment);
  });

  it('should handle submitCommentAction.rejected', () => {
    const initialState = createInitialState({ isCommentSubmitting: true });

    const state = commentsReducer(initialState, { type: submitCommentAction.rejected.type });

    expect(state.isCommentSubmitting).toBe(false);
  });
});
