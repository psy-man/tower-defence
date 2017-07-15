import { CannonType1 } from './cannon-type-1';
import { CannonType2 } from './cannon-type-2';
import { CannonTypes } from './cannon-types.enum';

export class CannonFactory {
  constructor(public type: CannonTypes, ...params) {
    params.unshift(null);

    switch (type) {
      case CannonTypes.type1:
        return new (Function.prototype.bind.apply(CannonType1, params))();
      case CannonTypes.type2:
        return new (Function.prototype.bind.apply(CannonType2, params))();

      default:
        console.error(`Type of ${type} doesn't exist`);
        break;
    }
  }
}
