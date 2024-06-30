export const mongooseSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const setUpdateSet = function (next) {
  this.getOptions.new = true;
  this.getOptions.runValidators = true;
  next();
};
