import Boom from '@hapi/boom';

export default async (model, column, value) => {
  try {
    const user = await model.query('where', column, value).fetch({ require: false });
    if (user) {
      throw Boom.badRequest(Boom.badRequest(`${column} is not unique`));
    } else {
      return value;
    }
  } catch (error) {
    throw error;
  }
};
