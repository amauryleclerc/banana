import { User } from './user';
import { Plush } from './plush';
export class PlushState {

    public static create(object: any): PlushState {
        if (object == null) {
            return null;
        }
        return new PlushState(object.plush, object.owner);
    }

    public static createFromArray(object: any): Array<PlushState> {
        if (object != null && object instanceof Array) {
            return object.map(v => new PlushState(v.plush, v.owner));
        }
        return null;
    }


    constructor(public plush: Plush, public owner: User) {
    }



}