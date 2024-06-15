const express = require('express');
const {Register,Login,Logout,deleteUser} = require('../controllers/user.controller')
const {addFavorites,getFavorites,removeFavorites} = require("../controllers/favourite.controller")
const {authentication} = require('../middlewares/user.middleware')

const router = express.Router();


router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', Logout);
router.delete('/:id',authentication,deleteUser); 


// favourites route

router.post('/favorites',authentication, addFavorites);
router.get("/favorites",authentication, getFavorites);   
router.post('/favorites/remove',authentication, removeFavorites);











module.exports = router;
