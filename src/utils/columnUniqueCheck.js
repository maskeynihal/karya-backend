import Boom from '@hapi/boom';

export const columnUniqueCheck = async (model, column, value) => {
  try {
    const data = await model
      .query((qb) => {
        qb.where(column, value);
      })
      .fetch({ require: false });
    if (data) {
      throw Boom.badRequest(Boom.badRequest(`${column} is not unique`));
    } else {
      return value;
    }
  } catch (error) {
    throw error;
  }
};

export const columnUniqueCheckWithIgnore = async (model, column, value, ignoreRowId) => {
  try {
    const data = await model
      .query((qb) => {
        qb.where(column, value).where('id', '<>', ignoreRowId);
      })
      .fetch({ require: false });
    if (data) {
      throw Boom.badRequest(Boom.badRequest(`${column} is not unique`));
    } else {
      return value;
    }
  } catch (error) {
    throw error;
  }
};
