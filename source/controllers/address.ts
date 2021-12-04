import { NextFunction, Request, Response } from "express";
import { Address, Address as AddressModel, addressSchema } from "../models/address";
import { client as dbClient } from "../db/connection";
const { validationResult } = require('express-validator');
import {generateUrl} from "../helpers/utils";
import { createNewAddress, updateExistingAddress } from "../services/address-service";
import { ModelNotFoundException } from "../exceptions/ModelNotFoundException";
import { ForbiddenActionException } from "../exceptions/ForbiddenActionException";

var ObjectId = require('mongoose').ObjectID;
var cache = require('memory-cache');

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
    
    cache.put(address._id, address);
    
    return res.set('Last-Modified', address.updatedAt).status(200).json({
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
    
    let address = await createNewAddress(body);

    return res.location(generateUrl(`address/${address._id}`)).status(201).json({
        status: 'success',
        message: 'Address created successfully',
        data: address
    });

}

export const updateAddress = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: "The given data is invalid", errors: errors.array() });
    }
    let id = req.params.id;
    let body = req.body;
    let address;

    try {
        address = await updateExistingAddress(id, body);
    } catch (error) {
        if (error instanceof ModelNotFoundException){
            return res.status(404).json({
                'status': 'error',
                'message': "The address with the specified id could not be found."
            })
        }
        if (error instanceof ForbiddenActionException){
            return res.status(403).json({
                status: 'error',
                message: 'The address can not be updated when current status is either `interested` or `not interested`'
            });
        }
    }
    

    return res.status(200).json({
        status: 'success',
        message: "Address updated successfully",
        data: address
    });
}

export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: "The given data is invalid", errors: errors.array() });
    }
    let id = req.params.id;

    const AddressSchema = dbClient.model('Address', addressSchema);

    let address = await AddressSchema.findById(id);
    if (address == null) {
        return res.status(404).json({
            'status': 'error',
            'message': "The address with the specified id could not be found."
        })
    }

    let deleteQuery = await AddressSchema.findOneAndDelete({ _id: id });
    if (deleteQuery){
        return res.status(200).json()
    }
    return res.status(409).json({
        status: 'error',
        message: "Unable to complete your request at this time"
    });
}