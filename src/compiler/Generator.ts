import { ICompileOptions } from "./Generator/ICompileOptions";
import { JSGenerator } from "./Generator/JSGenerator";
import { ParseType } from "./Parser/ParseType";

export class Generator
{
    private parses: ParseType[];
    private options: ICompileOptions

    constructor(parses: ParseType[], options: ICompileOptions)
    {
        this.parses = parses;
        this.options = options
    }

    generate()
    {
        const generator = new JSGenerator(this.options);
        return generator.build(this.parses);
    }
}