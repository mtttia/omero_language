import { ParseOperand } from "./ParseOperand";
import { ParseType } from "./ParseType";
export declare class ParseComparison extends ParseType {
    operandLeft: ParseOperand;
    operation: string;
    operandRight: ParseOperand;
    constructor(operandLeft: ParseOperand, operation: string, operandRight: ParseOperand);
    parseOperation(): " > " | " >= " | " == ";
}
