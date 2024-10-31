import { ParseOracle } from "./ParseOracle";
import { ParseType } from "./ParseType";

export type SingleOperand = string | ParseOperand | ParseOracle

export class ParseOperand extends ParseType
{
    public left: SingleOperand;
    public operand?: string;
    public right?: SingleOperand;

    constructor(left: SingleOperand)
    {
        super();
        this.left = left
    }

    setOperation(operand: string, right: SingleOperand)
    {
        this.operand = operand;
        this.right = right;
    }
}