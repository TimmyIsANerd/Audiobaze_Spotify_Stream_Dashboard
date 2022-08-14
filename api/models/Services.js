/**
 * Services.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    productName:{
      type:'string',
      required:true
    },
    productDescription:{
      type:'string',
      required:true
    },
    productType:{
      type:'string',
      isIn:['Renewable hosting','Non-Renewable Hosting','Streaming',''],
      required:true
    },
    price:{
      type:'number'
    }
    ,
    productNote:{
      type:'string',
    },
  },
};

