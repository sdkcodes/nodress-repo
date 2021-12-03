import mongoose from 'mongoose';


export interface Address {
    _id?: String|string|null;
    country: String;
    city: String;
    street: String;
    postalcode: String;
    number: Number;
    numberAddition?: String;
    createdAt?: String;
    updatedAt?: String;
    status?: String|string|null;
    name?: String|string|null;
    email?: String|string|null;
}

const {Schema} = mongoose;

export const addressSchema = new Schema<Address>(
    {
        country: String,
        city: String,
        street: String,
        postalcode: String,
        number: Number,
        numberAddition: String,
        createdAt: Date,
        updatedAt: Date,
        status: String,
        name: String,
        email: String
    }
)

addressSchema.set('timestamps', true);