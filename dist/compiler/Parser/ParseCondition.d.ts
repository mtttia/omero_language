import { ParseComparison } from "./ParseComparison";
import { ParseType } from "./ParseType";
export declare enum ComparisonType {
    and = 0,
    or = 1
}
export interface ParseComparisonItem {
    condition: ParseCondition | ParseComparison;
    type: ComparisonType;
    negate: boolean;
}
export declare class ParseCondition extends ParseType {
    comparisons: ParseComparisonItem[];
    constructor();
    addComparison(comparison: ParseCondition | ParseComparison, type: ComparisonType, negate: boolean): void;
}
