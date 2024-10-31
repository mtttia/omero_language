import { ParseOperand } from "./ParseOperand";
import { ParseType } from "./ParseType";

export class ParseAssignment extends ParseType
{

    public register: string;
    public operand: ParseOperand;

    constructor(register: string, operand: ParseOperand)
    {
        super()
        this.register = register;
        this.operand = operand;
    }
}