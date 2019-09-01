/* eslint-disable new-cap */
import {circleUtil, squareUtil} from '../utils';

const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
	const context = {
		circleArea: circleUtil.area(100),
		squareArea: squareUtil.area(200)
	};
	res.render('index', context);
});

module.exports = router;
