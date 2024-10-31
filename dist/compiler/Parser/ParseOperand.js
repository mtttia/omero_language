"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseOperand = void 0;
const ParseType_1 = require("./ParseType");
class ParseOperand extends ParseType_1.ParseType {
    constructor(left) {
        super();
        this.left = left;
    }
    setOperation(operand, right) {
        this.operand = operand;
        this.right = right;
    }
}
exports.ParseOperand = ParseOperand;
//# sourceMappingURL=ParseOperand.js.map