module.exports = {
  friendlyName: "Add Product",

  description: "Add New Product to Database",

  inputs: {
    productName: {
      type: "string",
      required: true,
    },
    productDescription: {
      type: "string",
      required: true,
    },
    productType: {
      type: "string",
      isIn: ["Renewable hosting", "Non-Renewable Hosting", "Streaming", ""],
      required: true,
    },
    price: {
      type: "number",
    },
    productNote: {
      type: "string",
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Product Successfully added to database",
    },
    failed: {
      statusCode: 500,
      description: "Failed to Add Product To Database",
    },
  },
  fn: async function ({productName,productDescription,productType,price, productNote}) {
    
    await Services.create({
        productName,
        productDescription,
        productNote,
        productType,
        price,
    }).then((success) =>{
        if(success){
            throw "success"
        }
    }).catch((error) =>{
        if(error){
            throw "failed"
        }
    })

  },
};
