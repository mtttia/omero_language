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

export abstract class IOmeroGenerator
{
    public compileOptions: ICompileOptions
    public argsVariableName: string = "args"

    constructor(compileOptions: ICompileOptions)
    {
        this.compileOptions = compileOptions
    }

    build(parses: ParseType[])
    {
        return this.generateHeader() + "\n" + this.generate(parses);
    }

    generate(parses: ParseType[]): string
    {
        return parses.map(p =>
        {
            if (p instanceof ParseAssignment)
            {
                return this.generateAssignment(p)
            }
            else if (p instanceof ParseComparison)
            {
                return this.generateComparison(p)
            }
            else if (p instanceof ParseCondition)
            {
                return this.generateCondition(p)
            }
            else if (p instanceof ParseEmpty)
            {
                return this.generateEmpty(p)
            }
            else if (p instanceof ParseIf)
            {
                return this.generateIf(p)
            }
            else if (p instanceof ParseLoop)
            {
                return this.generateLoop(p)
            }
            else if (p instanceof ParseOperand)
            {
                return this.generateOperand(p)
            }
            else if (p instanceof ParseOracle)
            {
                return this.generateOracle(p)
            }
            else if (p instanceof ParsePrint)
            {
                return this.generatePrint(p)
            }
        }).join("\n");
    }

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