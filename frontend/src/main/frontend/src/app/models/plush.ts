
export class Plush {


    public static create(object: any): Plush {
         if(object == null){
            return null;
        }
        return new Plush(object.id, object.name, object.img);
    }

    constructor(public id: string, public name: string, public img: string) {
    }



}