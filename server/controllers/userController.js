const { User, Profile } = require("../models/index");
const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const cloudinary = require("../utils/cloudinary");
const profile = require("../models/profile");
const { where } = require("sequelize");

const client = new OAuth2Client();

class userController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.create({ email, password });

      const profile = await Profile.create({
        userId: user.id,
      });

      const result = {
        email: user.email,
        userId: profile.userId,
      };

      res.status(201).json({
        message: "Success create new user",
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProfileByUserId(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const profile = await Profile.findAll({ where: { userId } });
      if (!profile) {
        throw { name: "NotFound" };
      }
      res.status(200).json(profile);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getProfilesById(req, res, next) {
    try {
      const id = req.params.id;
      const profile = await Profile.findByPk(id);
      if (!profile) {
        throw { name: "NotFound" };
      }
      res.status(200).json(profile);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { id } = req.params;
      const { name, phoneNumber, gender } = req.body;
      console.log(req.body);

      const profile = await Profile.findByPk(id);

      if (!profile) {
        throw { name: "NotFound", id };
      }

      await Profile.update(
        {
          name,
          phoneNumber,
          gender,
        },
        {
          where: {
            id,
          },
        }
      );

      const updatedProfile = await Profile.findByPk(id);

      res.status(200).json({
        message: `Success update profile id ${id}`,
        updatedProfile,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        res.status(400).json({ message: "Email required" });
      }

      if (!password) {
        res.status(400).json({ message: "Password required" });
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) throw { name: "LoginError" };

      if (!compare(password, user.password)) throw { name: "LoginError" };

      const payload = {
        id: user.id,
        email: user.email,
      };
      const access_token = signToken(payload);
      res.status(200).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { googleToken } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "google sukses",
        },
        hooks: false,
      });

      if (created) {
        await Profile.create({
          name: payload.name,
          userId: user.id,
        });
      }

      const access_token = signToken({
        email: user.email,
      });

      res.status(200).json({
        message: "Login Success",
        access_token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async imageProfile(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const profile = await Profile.findOne({
        where: {
          userId,
        },
      });

      if (!profile) throw { name: "NotFound" };

      if (!req.file) throw { name: `BadRequest`, message: "Please add image" };

      const buffer = req.file.buffer.toString("base64");

      const base64 = `data:image/type;base64,${buffer}`;

      const result = await cloudinary.uploader.upload(base64);

      await profile.update({
        imageUrl: result.url,
      });

      res.status(200).json({
        message: "Image has been updated",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = { userController };
