import { keyWords } from "../Lexer/tokens";
import { ParseCondition } from "./ParseCondition";
import { ParseOperand } from "./ParseOperand";
import { ParseType } from "./ParseType";

export class ParseComparison extends ParseType
{
    public operandLeft: ParseOperand
    public operation: string
    public operandRight: ParseOperand

    constructor(operandLeft: ParseOperand, operation: string, operandRight: ParseOperand)
    {
        super()
        this.operandLeft = operandLeft;
        this.operandRight = operandRight;
        this.operation = operation;
    }

    parseOperation()
    {
        if (this.operation == keyWords.greaterThan)
            return " > "
        else if (this.operation == keyWords.greaterOrEqualTo)
            return " >= "
        else if (this.operation == keyWords.equalTo)
            return " == "
        else
            throw new Error("Unexpected Token");
    }
}