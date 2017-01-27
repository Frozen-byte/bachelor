import {Pipe} from '@angular/core'

@Pipe({
  name: 'numberedJson'
})
export class NumberedJsonPipe {
  transform(val) {
    return JSON.stringify(val, null, 2)
      .replace('"', '')
  }
}
