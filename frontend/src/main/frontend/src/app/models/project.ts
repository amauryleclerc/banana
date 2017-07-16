
export class Project {


    static create(object?: any): Project {
        if (object != null) {
            return new Project(object.id,
                object.name,
                object.jiraId
            );
        }
        return new Project(null, null, null);
    }


    constructor(public id: string,
        public name: string,
        public jiraId: string) {

    }




}