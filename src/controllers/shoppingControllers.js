const {
  Package,
  Cart,
  CartDetail,
  Hotel,
  City,
  Activity,
  User,
  Business,
  Plattform,
} = require("../db");

const getShoppings = async (mail) => {
  console.log(mail);
  try {
    let user = await User.findAll({ where: { mail: mail } });
    if (!mail) {
      return "All fields are required";
    }
    let userJson = JSON.parse(JSON.stringify(user));
    let id = userJson[0]["id"];
    console.log(id);

    let shoppings = await Cart.findAll({
      where: { userId: id, statusCartId: [2, 3] },
      include: [
        {
          model: User,
        },
        {
          model: CartDetail,
          include: {
            model: Package,
            include: [
              { model: Hotel },
              { model: City },
              { model: Activity },
              { model: Business },
              { model: Plattform },
            ],
          },
        },
      ],
    });

    return shoppings;
  } catch (err) {
    return {
      msg: "Error getShoppings(shoppingController.js)",
      error: err,
    };
  }
};

module.exports = {
  getShoppings,
};
