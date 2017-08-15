import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'StoryFilter',
    pure: false
})
export class StoryFilter implements PipeTransform {
    transform(items: any[], filter: any): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => item.inScope === filter.inScope);
    }
}
