import { Links } from './links';
import { DateUtils } from '../services/date.service';
import { Sprint } from './sprint';
export class Story {

    static create(object?: any): Story {
        if (object != null) {
            return new Story(object.id,
                object.name,
                object.complexity,
                DateUtils.getDateIfPresent(object.closeDate),
                object.jiraId,
                object.businessValue,
                object.type,
                object._links);
        }
        return new Story(null, null, 0, null, null, 0, 'USER_STORY', null);
    }


    constructor(public id: string,
        public name: string,
        public complexity: number,
        public closeDate: Date,
        public jiraId: string,
        public businessValue: number,
        public type: string,
        public _links: Links) {
        if (this.closeDate != null) {
            this.closeDate.setHours(0, 0, 0, 0);
        }
    }

}
export class StoryInSprint {
    private sprint: Sprint;

    static createArray(array: Array<any>): Array<StoryInSprint> {
        if (array != null) {
            return array.map(o => StoryInSprint.create(o));
        }
        return new Array();
    }

    static create(object?: any): StoryInSprint {
        if (object != null) {
            return new StoryInSprint(
                object.inScope,
                object.bonus,
                DateUtils.getDateIfPresent(object.added),
                DateUtils.getDateIfPresent(object.removed),
                Story.create(object.story));
        }
        return new StoryInSprint(true, false, DateUtils.getToday(), null, null);
    }


    constructor(
        public inScope: boolean,  public bonus: boolean, public added: Date, public removed: Date, public story: Story) {
    }
    public getSprint(): Sprint {
        return this.sprint;
    }
    public setSprint(sprint: Sprint) {
        this.sprint = sprint;
    }
}


