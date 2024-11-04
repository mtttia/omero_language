import { keyWords } from "../Lexer/tokens";
import { ParseType } from "./ParseType";
export class ParseComparison extends ParseType {
    constructor(operandLeft, operation, operandRight) {
        super();
        this.operandLeft = operandLeft;
        this.operandRight = operandRight;
        this.operation = operation;
    }
    parseOperation() {
        if (this.operation == keyWords.greaterThan)
            return " > ";
        else if (this.operation == keyWords.greaterOrEqualTo)
            return " >= ";
        else if (this.operation == keyWords.equalTo)
            return " == ";
        else
            throw new Error("Unexpected Token");
    }
}
//# sourceMappingURL=ParseComparison.js.map