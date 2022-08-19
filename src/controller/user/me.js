const User = require("../../model/user");

const me = async (req, res) => {
  const currentUser = await User.findById(req.user.user_id).select([
    "first_name",
    "last_name",
    "email",
  ]);

  res.status(200).json(currentUser);
};

module.exports = me;
