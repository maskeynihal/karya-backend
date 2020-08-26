import db from '@/config/db';
import Boom from '@hapi/boom';

const TABLE_NAME = 'users';

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

  // initialize() {
  //   this.on('saving', this._assertEmailUnique);
  // }

  // async _assertEmailUnique(model, attributes, options) {
  //   // console.log(model, attributes, options);
  //   if (this.hasChanged('email')) {
  //     const user = await User.query('where', 'email', this.get('email')).fetch();

  //     if (user) {
  //       throw Boom.badRequest('Email is already taken');
  //     }

  //     console.log('user ===========', user || 'what no user');
  //     resolve();
  //     // return User.query('where', 'email', this.get('email'))
  //     //   .fetch()
  //     //   .then((existing) => {
  //     //     if (existing) {
  //     //     } else {
  //     //       return true;
  //     //     }
  //     //   });
  //     return true;
  //   }

  //   return true;
  // }
}

export default User;
