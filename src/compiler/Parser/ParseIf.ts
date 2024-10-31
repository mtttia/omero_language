import { ParseCondition } from "./ParseCondition";
import { ParseType } from "./ParseType";

export class ParseIf extends ParseType
{
    public condition: ParseCondition;
    public blockTrue: ParseType[]
    public blockFalse: ParseType[]

    constructor(condition: ParseCondition, blockTrue: ParseType[], blockFalse: ParseType[])
    {
        super()
        this.condition = condition
        this.blockTrue = blockTrue
        this.blockFalse = blockFalse
    }
}