import db from '@/config/db';
import Boom from '@hapi/boom';
import User from './user';
import Project from './project';

const TABLE_NAME = 'tasks';
const ASSIGN_TYPE_TAG = 1;

/**
 * Task model.
 */
class Task extends db.Model {
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

  assignedUser() {
    return this.belongsTo(User, 'assignee_id', 'id');
  }

  project() {
    return this.belongsTo(Project, 'project_id', 'id');
  }

  taggedUsers() {
    return this.belongsToMany(User, 'task_user', 'task_id', 'user_id')
      .query({ where: { assign_type_id: ASSIGN_TYPE_TAG }, debug: true })
      .withPivot('assign_type_id');
  }
}

export default Task;
