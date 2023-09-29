/**
 * Middleware function to wrap auth operation with try/catch
 * @param {Function} operation auth operation to be handled
 * @returns Function wrapper
 */
export const operationWrapper = operation => {
  return async (dispatch, getState) => {
    try {
      await operation(dispatch, getState);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };
};
