import { ICompileOptions } from "./Generator/ICompileOptions";
import { ParseType } from "./Parser/ParseType";
export declare class Generator {
    private parses;
    private options;
    constructor(parses: ParseType[], options: ICompileOptions);
    generate(): string;
}
