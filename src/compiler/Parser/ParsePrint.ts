import { ParseOperand } from "./ParseOperand";
import { ParseType } from "./ParseType";

export enum PrintType
{
    number, string
}

export class ParsePrint extends ParseType
{
    public operand: ParseOperand;
    public printType: PrintType

    constructor(operand: ParseOperand, printType: PrintType)
    {
        super()
        this.operand = operand
        this.printType = printType
    }
}