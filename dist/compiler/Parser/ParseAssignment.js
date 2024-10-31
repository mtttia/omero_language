"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseAssignment = void 0;
const ParseType_1 = require("./ParseType");
class ParseAssignment extends ParseType_1.ParseType {
    constructor(register, operand) {
        super();
        this.register = register;
        this.operand = operand;
    }
}
exports.ParseAssignment = ParseAssignment;
//# sourceMappingURL=ParseAssignment.js.map