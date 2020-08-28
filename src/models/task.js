import db from '@/config/db';
import Boom from '@hapi/boom';
import User from './user';
import Project from './project';
import Comment from './comment';

const TABLE_NAME = 'tasks';
const ASSIGN_TYPE_TAG = 1;
const REMOVED_TYPE = 2;

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

  initialize() {
    this.on('updated', function (task) {
      if (task.attributes.assignee_id !== task.previousAttributes().assignee_id) {
        task.removedUsers().attach({
          task_id: task.id,
          user_id: task.previousAttributes().assignee_id,
          assign_type_id: REMOVED_TYPE
        });
      }
    });
  }

  assignedUser() {
    return this.belongsTo(User, 'assignee_id', 'id');
  }

  project() {
    return this.belongsTo(Project, 'project_id', 'id');
  }

  taggedUsers() {
    return this.belongsToMany(User, 'task_user', 'task_id', 'user_id')
      .query({ where: { assign_type_id: ASSIGN_TYPE_TAG } })
      .withPivot('assign_type_id');
  }

  removedUsers() {
    return this.belongsToMany(User, 'task_user', 'task_id', 'user_id')
      .query({ where: { assign_type_id: REMOVED_TYPE } })
      .withPivot('assign_type_id');
  }

  comments() {
    return this.hasMany(Comment, 'task_id', 'id');
  }
}

export default Task;
