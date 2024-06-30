export const mongooseSaveError = (error, data, next) => {
  error.status = 400;
  next();
};
