import kenxJs from 'knex';
import bookshelfJs from 'bookshelf';

import knexConfig from '@/config/kenxfile';

/**
 * Database connection.
 */
const knex = knexJs(knexConfig);
const bookshelf = bookshelfJs(knex);

bookshelf.plugin(['bookshelf-virtuals-plugin']);

export default bookshelf;
