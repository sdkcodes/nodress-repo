import { NextFunction, Request, Response, Router } from "express";
import { param, body, validationResult } from "express-validator";
import { createAddress, deleteAddress, getAddress, getAddresses, updateAddress } from "../controllers/address";

const router = Router();
const allowed_statuses = ['not at home', 'not interested', 'interested'];

var cache = require('memory-cache');

let cache_ware = (req: any, res: any, next: any) => {
    let id = req.params.id;
    let cached_address = cache.get(id);
    
    if (cached_address){
        let client_last_modified_date = new Date(req.header('If-Modified-Since'));
        let cached_last_updated_date = new Date(cached_address.updatedAt);
        if (cached_last_updated_date <= client_last_modified_date){
            
            //we can more appropriately send a 304 status here to indeed show that item has not been modified
            return res.status(200).json({
                status: 'success',
                data: cached_address,
                message: 'Sent from cache'
            })
        }else{
            next();
        }
    }else{
        next();
    }
    
}
router.get('/address', getAddresses);
router.get(
    '/address/:id',
    [
        param('id').isMongoId().withMessage("The specified ID must be a  valid hex-encoded representation of a MongoDB ObjectId")
    ],
    cache_ware,
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

router.patch('/address/:id', 
    [
        param('id').isMongoId().withMessage("The specified ID must be a  valid hex-encoded representation of a MongoDB ObjectId"),
        body('status').isIn(allowed_statuses).withMessage(`The status must be one of: ${allowed_statuses.join(",")}`),
        body('name').optional().isString(),
        body('email').notEmpty().withMessage("Email is required").isEmail().withMessage("A valid email format is required"),
    ],
    updateAddress
);

router.delete('/address/:id',
    [
        param('id').isMongoId().withMessage("The specified ID must be a  valid hex-encoded representation of a MongoDB ObjectId")
    ],
    deleteAddress
);

export = router;