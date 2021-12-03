import { NextFunction, Request, Response } from "express";
import { Address, Address as AddressModel, addressSchema } from "../models/address";
import { client as dbClient } from "../db/connection";
const { validationResult } = require('express-validator');

var ObjectId = require('mongoose').ObjectID;

export const getAddresses = async(req: Request, res: Response, next: NextFunction) => {
    
    const AddressSchema = dbClient.model('Address', addressSchema);
    
    let addresses: [AddressModel] = await AddressSchema.find();

    return res.json({
        'status' : 'success',
        'data' : addresses,
        message: "Addresses retrieved successfully"
    }).status(200);
}

export const getAddress = async(req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: "The given data is invalid", errors: errors.array() });
    }
    let id = req.params.id;

    const AddressSchema = dbClient.model('Address', addressSchema);
    
    let address: AddressModel = await AddressSchema.findById(id);
    if (address == null){
        return res.status(404).json({
            'status' : 'error',
            'message' : "The address with the specified id could not be found."
        })
    }
    return res.status(200).json({
        status: 'success',
        message: "Address retrieved successfully",
        data: address
    });

}

export const createAddress = async(req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: "The given data is invalid", errors: errors.array() });
    }
    let body = req.body;
    body.status = null;
    body.name = null;
    body.email = null;

    const AddressSchema = dbClient.model('Address', addressSchema);
    const addressModel = new AddressSchema(body);
    
    await addressModel.save();
    
    return res.status(201).json({
        status: 'success',
        message: 'Address created successfully',
        data: addressModel
    });

}

export const updateAddress = async (req: Request, res: Response, next: NextFunction) => {

    let id = req.params.id;
}

export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    
}