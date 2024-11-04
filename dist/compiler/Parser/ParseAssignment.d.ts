import { ParseOperand } from "./ParseOperand";
import { ParseType } from "./ParseType";
export declare class ParseAssignment extends ParseType {
    register: string;
    operand: ParseOperand;
    constructor(register: string, operand: ParseOperand);
}
