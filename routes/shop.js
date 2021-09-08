const express=require('express');
const router=express.Router();
const shopController=require('../controllers/shopController.js');

router.get('/',shopController.getIndex);
router.get('/detail/:prodId',shopController.getDetail);


module.exports = router;
