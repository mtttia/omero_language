import { ParseCondition } from "./ParseCondition";
import { ParseType } from "./ParseType";
export declare class ParseLoop extends ParseType {
    condition: ParseCondition;
    block: ParseType[];
    constructor(condition: ParseCondition, block: ParseType[]);
}
