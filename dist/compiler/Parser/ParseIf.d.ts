import { ParseCondition } from "./ParseCondition";
import { ParseType } from "./ParseType";
export declare class ParseIf extends ParseType {
    condition: ParseCondition;
    blockTrue: ParseType[];
    blockFalse: ParseType[];
    constructor(condition: ParseCondition, blockTrue: ParseType[], blockFalse: ParseType[]);
}
