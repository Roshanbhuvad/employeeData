//this helper method just checking whether sending data is array of data or single data
const mongoose = require("mongoose");
const constants = require("../constants"); 
module.exports.formatMongoData = (data) => {

  if (Array.isArray(data)) {
    
    let newDataList = [];
    for (value of data) {
      newDataList.push(value.toObject());
      //value.toObject(); //we need to store newly transform value object newDataList[]
    }
    return newDataList;
  }
  return data.toObject(); //If data are not array then simply returns toObject()
};

module.exports.checkObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(constants.databaseMessage.INVALID_ID);
  }
};
