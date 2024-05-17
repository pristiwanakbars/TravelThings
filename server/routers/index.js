const router = require("express").Router();
const upload = require("../utils/multer");
const { userController } = require("../controllers/userController");
const hotelController = require("../controllers/hotelController");
const { authentication, authorization } = require("../middlewares/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/login/google", userController.googleLogin);

router.use(authentication);

router.get("/hotels", hotelController.getHotel);

router.post("/hotels", hotelController.addToMyHotel);

router.get("/profile", userController.getProfileByUserId);

router.get("/profile/:id", userController.getProfilesById);
router.put("/update/profile/:id", userController.updateProfile);
router.patch(
  "/upload/:id",
  upload.single("imageUrl"),
  userController.imageProfile
);

module.exports = router;
