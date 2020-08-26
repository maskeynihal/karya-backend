import Boom from '@hapi/boom';

import Comment from '@/models/comment';
import { uniqueId } from 'lodash';
import { v4 as uuid } from 'uuid';
import hashPassword from '@/utils/hashPassword';

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllComments() {
  return Comment.fetchAll();
}

/**
 * Get a comment.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getComment(id) {
  return new Comment({ id })
    .fetch()
    .then((comment) => comment)
    .catch(Comment.NotFoundError, () => {
      throw Boom.notFound('Comment not found');
    });
}

/**
 * Create new comment.
 *
 * @param   {Object}  comment
 * @returns {Promise}
 */
export function createComment(comment) {
  return new Comment({
    text: comment.text,
    task_id: comment.task_id,
    commenter_id: comment.commenter_id
  }).save();
}

/**
 * Update a comment.
 *
 * @param   {Number|String}  id
 * @param   {Object}         comment
 * @returns {Promise}
 */
export function updateComment(id, comment) {
  return new Comment({ id }).save({ ...comment });
}

/**
 * Delete a comment.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteComment(id) {
  return new Comment({ id }).fetch().then((comment) => comment.destroy());
}
