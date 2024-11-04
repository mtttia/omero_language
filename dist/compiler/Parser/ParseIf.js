import { ParseType } from "./ParseType";
export class ParseIf extends ParseType {
    constructor(condition, blockTrue, blockFalse) {
        super();
        this.condition = condition;
        this.blockTrue = blockTrue;
        this.blockFalse = blockFalse;
    }
}
//# sourceMappingURL=ParseIf.js.map