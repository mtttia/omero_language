import { ParseOracle } from "./ParseOracle";
import { ParseType } from "./ParseType";
export type SingleOperand = string | ParseOperand | ParseOracle;
export declare class ParseOperand extends ParseType {
    left: SingleOperand;
    operand?: string;
    right?: SingleOperand;
    constructor(left: SingleOperand);
    setOperation(operand: string, right: SingleOperand): void;
}
