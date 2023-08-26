import { EventEmitter } from '@angular/core';
import { Observable, Observer } from 'rxjs';

export interface IPage {
  // execute the validation process local to the page it self
  // returns true if the validation process was successfull or false if
  // the validation process faced some error
  validate(): boolean;

  // execute all the operations corresponding to the end in the life cycle of the page
  terminate(): void;

  // fired when the operations corresponding to the 'terminate' procedure has done
  get Terminated(): Observable<void>;
}
