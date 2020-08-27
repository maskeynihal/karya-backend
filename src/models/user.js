import db from '@/config/db';
import Boom from '@hapi/boom';
import Role from './role';
import Project from './project';
import Task from './task';
import Comment from './comment';

const TABLE_NAME = 'users';
const ASSIGN_TYPE_TAG = 1;

/**
 * User model.
 */
class User extends db.Model {
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

  role() {
    return this.belongsToMany(Role, 'role_user', 'user_id', 'role_id').withPivot('role_id');
  }

  projects() {
    return this.hasMany(Project, 'project_manager_id', 'id');
  }

  tasksAssigns() {
    return this.hasMany(Task, 'assignee_id', 'id');
  }

  tasksTags() {
    return this.belongsToMany(Task, 'task_user', 'user_id', 'task_id')
      .query({ where: { assign_type_id: ASSIGN_TYPE_TAG }, debug: true })
      .withPivot('assign_type_id');
  }

  comments() {
    return this.hasMany(Comment, 'commenter_id', 'id');
  }
}

export default User;
