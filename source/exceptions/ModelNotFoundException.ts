export class ModelNotFoundException extends Error{
    constructor(message: string){
        super(message);
        this.name = "ModelNotFoundException";
    }
}