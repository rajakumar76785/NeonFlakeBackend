const express = require('express');

const{uploadFile, getAllFile, getFileById} = require("../controllers/fileControllers");

const router = express.Router();

router.post("/upload",uploadFile);
router.get('/',getAllFile);
router.get("/:id",getFileById);

module.exports = router;