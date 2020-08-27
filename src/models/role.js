import db from '@/config/db';
import Boom from '@hapi/boom';

const TABLE_NAME = 'roles';

/**
 * Role model.
 */
class Role extends db.Model {
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
}

export default Role;
