
export class User {

    public static create(object: any): User {
        if(object == null){
            return null;
        }
        return new User(object.id, object.name);
    }
    constructor(public id: string, public name: string) {
    }

}