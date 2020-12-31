import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'commentRelativeTime'
})
export class CommentRelativeTimePipe implements PipeTransform {

  transform(createdAt: string, ...args: unknown[]): unknown {
    moment.locale('he');
    return moment(createdAt).fromNow();
  }

}
