const { register,login,setPColor }=require("../controllers/usersController");
const {newidea,getAllpost,likePost,addComment, Comments} = require("../controllers/ideaController");

const router = require("express").Router();

router.post("/register",register);
router.post("/login",login);
router.post("/newIdea", newidea);
router.post("/setPColor",setPColor);
router.get("/getPost",getAllpost);
router.post("/likePost",likePost);
router.post("/addComment",addComment);

module.exports = router;