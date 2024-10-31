import { ParseType } from "./ParseType";

export class ParseOracle extends ParseType
{
    public index: number

    constructor(index: number)
    {
        super()
        this.index = Number(index)
    }
}