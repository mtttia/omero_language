import { ParseOperand } from "./ParseOperand";
import { ParseType } from "./ParseType";
export declare enum PrintType {
    number = 0,
    string = 1
}
export declare class ParsePrint extends ParseType {
    operand: ParseOperand;
    printType: PrintType;
    constructor(operand: ParseOperand, printType: PrintType);
}
