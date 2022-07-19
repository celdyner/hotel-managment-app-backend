function errorHandler(error, request, response, next) {

    return response.status(error.statusCode || 500).json({
  
      error: {
  
        message: error.message || "Couldn't complete Request Please Try Again",
  
      },
  
    });
  
  }
  
  
  
  module.exports = errorHandler;