import db from '@/config/db';
import Boom from '@hapi/boom';
import Task from './task';
import User from './user';

const TABLE_NAME = 'projects';

/**
 * Project model.
 */
class Project extends db.Model {
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

  tasks() {
    return this.hasMany(Task, 'project_id', 'id');
  }

  projectManager() {
    return this.belongsTo(User, 'project_manager_id', 'id');
  }

  users() {
    return this.belongsToMany(User, 'project_user', 'user_id', 'project_id');
  }
}

export default Project;
