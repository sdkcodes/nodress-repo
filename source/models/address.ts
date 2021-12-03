import mongoose from 'mongoose';


export interface Address {
    id?: String;
    country: String;
    city: String;
    street: String;
    postalcode: String;
    number: Number;
    numberAddition?: String;
    createdAt?: String;
    updatedAt?: String;
    status?: String|null;
    name?: String|null;
    email?: String|null;
}

const {Schema} = mongoose;

export const addressSchema = new Schema(
    {
        id: String,
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