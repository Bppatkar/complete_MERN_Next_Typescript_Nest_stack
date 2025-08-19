import Product from '../models/Product.model.js';

const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      //  finding product which inStock is "true" and price is > 100
      {
        $match: {
          inStock: true,
          price: {
            $gte: 100,
          },
        },
      },
      // we found two products with inStock true and price > 100

      //  finding done now grouping document based on category and whats a average price
      //  of that same category product and how many products in same category
      {
        $group: {
          _id: '$category',
          avgPrice: {
            $avg: '$price',
          },
          count: {
            $sum: 1,
          },
        },
      },
      // {"success":true,"data":[{"_id":"Electronics","avgPrice":849,"count":2}]}
    ]);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Some error occured!',
    });
  }
};
const getProductAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      // filtering based on category
      {
        $match: {
          category: 'Electronics',
        },
      },
      // grouping products based on totalRev, avgPrice, min and max Price
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: '$price',
          },
          averagePrice: {
            $avg: '$price',
          },
          maxProductPrice: {
            $max: '$price',
          },
          minProductPrice: {
            $min: '$price',
          },
        },
      },
      // now we show the data using project , shpw value 1 , not show value 0
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          averagePrice: 1,
          maxProductPrice: 1,
          minProductPrice: 1,
          priceRange: {
            $subtract: ['$maxProductPrice', '$minProductPrice'],
          },
        },
      },
    ]);

    // what we got in console
    /* Analysis result: [
      {
        totalRevenue: 1897,
        averagePrice: 632.3333333333334,
        maxProductPrice: 999,
        minProductPrice: 199,
        priceRange: 800
      }
    ] */
    console.log('Analysis result:', result);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Some error occured while getting analysis !',
    });
  }
};
const insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: 'Laptop',
        category: 'Electronics',
        price: 999,
        inStock: true,
        tags: ['computer', 'tech'],
      },
      {
        name: 'Smartphone',
        category: 'Electronics',
        price: 699,
        inStock: true,
        tags: ['mobile', 'tech'],
      },
      {
        name: 'Headphones',
        category: 'Electronics',
        price: 199,
        inStock: false,
        tags: ['audio', 'tech'],
      },
      {
        name: 'Running Shoes',
        category: 'Sports',
        price: 89,
        inStock: true,
        tags: ['footwear', 'running'],
      },
      {
        name: 'Novel',
        category: 'Books',
        price: 15,
        inStock: true,
        tags: ['fiction', 'bestseller'],
      },
    ];

    const result = await Product.insertMany(sampleProducts);
    res.status(201).json({
      success: true,
      message: 'Data Inserted SuccessFully',
      data: `Inserted ${result.length} sample products`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Some error occured!',
    });
  }
};

export { getProductAnalysis, getProductStats, insertSampleProducts };
