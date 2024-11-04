import { ParseType } from "./ParseType";
export class ParseOperand extends ParseType {
    constructor(left) {
        super();
        this.left = left;
    }
    setOperation(operand, right) {
        this.operand = operand;
        this.right = right;
    }
}
//# sourceMappingURL=ParseOperand.js.map