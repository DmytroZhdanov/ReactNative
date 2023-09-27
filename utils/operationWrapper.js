export const operationWrapper = operation => {
  return async (dispatch, getState) => {
    try {
      await operation(dispatch, getState);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };
};
