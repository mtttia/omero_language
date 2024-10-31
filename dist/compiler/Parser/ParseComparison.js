"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseComparison = void 0;
const tokens_1 = require("../Lexer/tokens");
const ParseType_1 = require("./ParseType");
class ParseComparison extends ParseType_1.ParseType {
    constructor(operandLeft, operation, operandRight) {
        super();
        this.operandLeft = operandLeft;
        this.operandRight = operandRight;
        this.operation = operation;
    }
    parseOperation() {
        if (this.operation == tokens_1.keyWords.greaterThan)
            return " > ";
        else if (this.operation == tokens_1.keyWords.greaterOrEqualTo)
            return " >= ";
        else if (this.operation == tokens_1.keyWords.equalTo)
            return " == ";
        else
            throw new Error("Unexpected Token");
    }
}
exports.ParseComparison = ParseComparison;
//# sourceMappingURL=ParseComparison.js.map