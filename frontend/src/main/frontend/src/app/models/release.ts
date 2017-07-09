export class Release {

    constructor(public id: string,
        public name: string,
        public businessValue: string,
        public start: Date,
        public end: Date) {
    }

    static create(object?: any): Release {
        if (object != null) {
            if (typeof object._embedded === 'undefined') {
                object._embedded = {};
            }
            return new Release(//
                object.id,//
                object.name,//
                object.businessValue,//
                object.start,//
                object.end)
        }
        return new Release(null, null, null, new Date(), null);
    }

}