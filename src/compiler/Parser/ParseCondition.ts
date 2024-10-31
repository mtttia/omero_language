import { ParseComparison } from "./ParseComparison";
import { ParseType } from "./ParseType";

export enum ComparisonType
{
    and, or
}

export interface ParseComparisonItem
{
    condition: ParseCondition | ParseComparison,
    type: ComparisonType
    negate: boolean
}

export class ParseCondition extends ParseType
{
    public comparisons: ParseComparisonItem[]

    constructor()
    {
        super()
        this.comparisons = []
    }

    addComparison(comparison: ParseCondition | ParseComparison, type: ComparisonType, negate: boolean)
    {
        this.comparisons.push({
            condition: comparison,
            type: type,
            negate: negate
        })
    }
}