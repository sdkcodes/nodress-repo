import { Router } from "express";
import { param, body, validationResult } from "express-validator";
import { createAddress, getAddress, getAddresses } from "../controllers/address";

const router = Router();

router.get('/address', getAddresses);
router.get(
    '/address/:id',
    [
        param('id').isMongoId().withMessage("The specified ID must be a  valid hex-encoded representation of a MongoDB ObjectId")
    ],
    getAddress
);
router.post('/address',
    [
        body('country').isISO31661Alpha2().withMessage("The country must be a valid Alpha-2 code from ISO 3166-1."),
        body('city').isString().notEmpty().withMessage("City can not be empty"),
        body('street').isString().withMessage("Street can not be empty"),
        body('postalcode').isNumeric().isLength({min: 5, max: 5}).withMessage("Postal code must be a 5 digit string"),
        body('number').isInt({gt: 1}).withMessage("Number must be a positive integer"),
        body('numberAddition').isString().withMessage("Number addition must be a string")
    ],
    createAddress
);
export = router;