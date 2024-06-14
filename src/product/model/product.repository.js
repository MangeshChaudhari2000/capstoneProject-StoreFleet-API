import ProductModel from "./product.schema.js";

export const addNewProductRepo = async (product) => {
  return await new ProductModel(product).save();
};

export const getAllProductsRepo = async (page, keyword) => {
  // const data= await ProductModel.find({}).limit(page);
  let query = {};
  if (keyword !== undefined) {
    query.name = keyword;
  }
  const data = await ProductModel.find(query).limit(page);
  return data;
};

export const updateProductRepo = async (_id, updatedData) => {
  return await ProductModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};

export const deleProductRepo = async (_id) => {
  return await ProductModel.findByIdAndDelete(_id);
};

export const getProductDetailsRepo = async (_id) => {
  return await ProductModel.findById(_id);
};

export const getTotalCountsOfProduct = async () => {
  return await ProductModel.countDocuments();
};

export const findProductRepo = async (productId) => {
  return await ProductModel.findById(productId);
};

export const filterProductByCategoryRepo = async (page, keyword, category) => {
  try {
    var query = {};
    if (keyword) {
      query.name = keyword;
    }
    if (category) {
      query.category = category;
    }
    const product = await ProductModel.find(query).limit(page);
    return product;
  } catch (error) {
    console.log(error.message);
  }

};


export const filterProductByPriceRepo = async (page, pricelte, pricegte) => {
  try {
    var query = {};
    if (pricelte && pricegte) {
      query.price = { $gte: pricegte, $lte: pricelte };
    } else if (pricelte) {
      query.price = { $lte: pricelte };
    } else if (pricegte) {
      query.price = { $gte: pricegte };
    }

    const product = await ProductModel.find(query).limit(page);
    return product;
  } catch (error) {
    console.log(error.message);
  }
};



export const filterProductByRatingRepo = async (page, ratingLte, ratingGte) => {
  try {
    var query = {};
    if (ratingLte && ratingGte) {
      query.rating = { $gte: ratingGte, $lte: ratingLte };
    } else if (ratingLte) {
      query.rating = { $lte: ratingLte };
    } else if (ratingGte) {
      query.rating = { $gte: ratingGte };
    }

    const product = await ProductModel.find(query).limit(page);
    return product;
  } catch (error) {
    console.log(error.message);
  }
};