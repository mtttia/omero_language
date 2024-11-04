import { ParseAssignment } from "../Parser/ParseAssignment";
import { ParseComparison } from "../Parser/ParseComparison";
import { ParseCondition } from "../Parser/ParseCondition";
import { ParseEmpty } from "../Parser/ParseEmpty";
import { ParseIf } from "../Parser/ParseIf";
import { ParseLoop } from "../Parser/ParseLoop";
import { ParseOperand } from "../Parser/ParseOperand";
import { ParseOracle } from "../Parser/ParseOracle";
import { ParsePrint } from "../Parser/ParsePrint";
import { ParseType } from "../Parser/ParseType";
import { ICompileOptions } from "./ICompileOptions";
export declare abstract class IOmeroGenerator {
    compileOptions: ICompileOptions;
    argsVariableName: string;
    constructor(compileOptions: ICompileOptions);
    build(parses: ParseType[]): string;
    generate(parses: ParseType[]): string;
    abstract generateHeader(): string;
    abstract generateAssignment(parse: ParseAssignment): string;
    abstract generateComparison(parse: ParseComparison): string;
    abstract generateCondition(parse: ParseCondition): string;
    abstract generateEmpty(parse: ParseEmpty): string;
    abstract generateIf(parse: ParseIf): string;
    abstract generateLoop(parse: ParseLoop): string;
    abstract generateOperand(parse: ParseOperand): string;
    abstract generateOracle(parse: ParseOracle): string;
    abstract generatePrint(parse: ParsePrint): string;
}
