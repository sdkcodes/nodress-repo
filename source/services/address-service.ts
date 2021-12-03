import { Address, addressSchema } from "../models/address";
import { client as dbClient } from "../db/connection";
import { Model } from "mongoose";
import { ForbiddenActionException } from "../exceptions/ForbiddenActionException";
import { ModelNotFoundException } from "../exceptions/ModelNotFoundException";

export async function createNewAddress(data: Address){
    data.name = null;
    data.status = null;
    data.email = null;

    const AddressSchema: Model<Address> = dbClient.model('Address', addressSchema);
    const addressModel = new AddressSchema(data);

    let address: Address = await addressModel.save();
    return address
}

export async function updateExistingAddress(id: String, data: Address){
    
    const AddressSchema = dbClient.model('Address', addressSchema);
    let address = await AddressSchema.findById(id);

    if (address == null) {
        throw new ModelNotFoundException("The address with the specified id could not be found.");
    }
    if (['not interested', 'interested'].includes(address.status)) {
        throw new ForbiddenActionException("The address can not be updated when current status is either `interested` or `not interested`");
    }

    address.status = data.status;
    address.name = data.name;
    address.email = data.email;
    address = await address.save();
    return address;
}