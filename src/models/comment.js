import db from '@/config/db';
import Boom from '@hapi/boom';
import Task from './task';
import User from './user';

const TABLE_NAME = 'comments';

/**
 * Comment model.
 */
class Comment extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }

  task() {
    return this.belongsTo(Task, 'task_id', 'id');
  }

  commenter() {
    return this.belongsTo(User, 'commenter_id', 'id');
  }
}

export default Comment;
