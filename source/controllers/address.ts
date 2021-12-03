import { NextFunction, Request, Response } from "express";
import { Address as AddressModel } from "../models/address";

export const getAddresses = async(req: Request, res: Response, next: NextFunction) => {
    let address: AddressModel = {
        country: "NG",
        city: "Lagos",
        id: "t3tt3ytyt367633",
        street: "Lagos main address",
        number: 234,
        numberAddition: "801",
        postalcode: "23401"
    }

    let addresses: [AddressModel] = [address];
    return res.json({
        'status' : 'success',
        'data' : addresses,
        message: "Addresses retrieved successfully"
    }).status(200);
}

export const getAddress = async(req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;

    let address: AddressModel = {
        "id": "581b5b28f3bc7b88210c4fe2",
        "country": "CZ",
        "city": "Brno",
        "street": "Husova",
        "postalcode": "60200",
        "number": 6,
        "numberAddition": "",
        "createdAt": "2016-11-03T15:22:31Z",
        "updatedAt": "2016-11-03T15:22:31Z",
        "status": null,
        "name": null,
        "email": null
    }

    if (id != address.id){
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

    let body = req.body;
}

export const updateAddress = async (req: Request, res: Response, next: NextFunction) => {

    let id = req.params.id;
}

export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    
}