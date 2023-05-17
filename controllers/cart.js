const { User, Product } = require("../database.js");

const addToCart = async (req, res) => {
  const id = await req.body.id;
  const userId = "646358bcaff646deba05ee5a";

  try {
    console.log(id);
    Product.findById(id).then((product) => {
      console.log("product : ", product);

      User.findByIdAndUpdate(
        userId,
        {
          $push: {
            cart: {
              product_id: "4",
              product_name: "product4",
            },
          },
        },
        { new: true }
      ).then((user) => {
        console.log("user: ", user);
      });
    });
  } catch (error) {
    console.log("something went wrong");
  }
};

module.exports = { addToCart };
