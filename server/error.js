function myError(errObjOrMsg,httpCode){
  if(errObjOrMsg instanceof Error)
    this.message = errObjOrMsg.message;
  else
    this.message = errObjOrMsg;

  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.code = httpCode;
}

module.exports = myError;