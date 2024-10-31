import { ParseCondition } from "./ParseCondition";
import { ParseType } from "./ParseType";

export class ParseLoop extends ParseType
{
    public condition: ParseCondition;
    public block: ParseType[]

    constructor(condition: ParseCondition, block: ParseType[])
    {
        super()
        this.condition = condition
        this.block = block
    }
}