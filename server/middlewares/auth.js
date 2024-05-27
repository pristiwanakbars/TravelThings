const { verifyToken } = require("../helpers/jwt");
const { User, Profile } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw { name: "Unauthorized" };

    const access_token = authorization.split(" ")[1];

    const payload = verifyToken(access_token);

    const user = await User.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!user) throw { name: "Unauthorized" };

    req.loginInfo = {
      userId: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

const authorization = async (req, res, next) => {
  try {
    const { userId } = req.loginInfo;

    const user = await User.findByPk(userId);

    if (!user) throw { name: "Forbidden" };

    const { id } = req.params;

    const profile = await Profile.findByPk(id);

    if (!profile) throw { name: "NotFound" };

    if (profile.userId !== user.id) throw { name: "Forbidden" };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication, authorization };
