const router = require("express").Router();
const upload = require("../utils/multer");
const { userController } = require("../controllers/userController");
const hotelController = require("../controllers/hotelController");
const MyHotelController = require("../controllers/myHotelController");
const { authentication, authorization } = require("../middlewares/auth");
const AiController = require("../controllers/aiController");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/login/google", userController.googleLogin);

router.use(authentication);

//openai
router.post("/aireview/:id", AiController.reviewHotel);

//hotels
router.get("/hotels", hotelController.getHotel);

//myhotels
router.get("/myhotels", MyHotelController.getMyHotel);
router.post("/myhotels", MyHotelController.createMyHotel);
router.delete("/myhotels/:id", MyHotelController.deleteMyHotel);

router.get("/profile", userController.getProfileByUserId);

router.get("/profile/:id", userController.getProfilesById);
router.put("/update/profile/:id", userController.updateProfile);
router.patch(
  "/upload/:id",
  upload.single("imageUrl"),
  userController.imageProfile
);

module.exports = router;
