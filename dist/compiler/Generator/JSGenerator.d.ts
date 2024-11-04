import { ParseAssignment } from "../Parser/ParseAssignment";
import { ParseComparison } from "../Parser/ParseComparison";
import { ParseCondition } from "../Parser/ParseCondition";
import { ParseEmpty } from "../Parser/ParseEmpty";
import { ParseIf } from "../Parser/ParseIf";
import { ParseLoop } from "../Parser/ParseLoop";
import { ParseOperand } from "../Parser/ParseOperand";
import { ParseOracle } from "../Parser/ParseOracle";
import { ParsePrint } from "../Parser/ParsePrint";
import { IOmeroGenerator } from "./IOmeroGenerator";
export declare class JSGenerator extends IOmeroGenerator {
    generateHeader(): string;
    getArguments(): string;
    generateAssignment(parse: ParseAssignment): string;
    generateComparison(parse: ParseComparison): string;
    generateCondition(parse: ParseCondition): string;
    generateEmpty(parse: ParseEmpty): string;
    generateIf(parse: ParseIf): string;
    generateLoop(parse: ParseLoop): string;
    generateOperand(parse: ParseOperand): string;
    generateOracle(parse: ParseOracle): string;
    generatePrint(parse: ParsePrint): string;
}
