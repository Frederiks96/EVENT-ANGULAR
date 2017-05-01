import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortString'
})
export class ShortStringPipe implements PipeTransform {
    transform(value: any, sizelimit: number) {
        if (value.length > sizelimit) {
            return value.substr(0, sizelimit) + ' ...';
        }
        return value;
    }
}

