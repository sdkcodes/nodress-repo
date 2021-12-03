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