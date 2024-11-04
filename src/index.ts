import { Generator } from "./compiler/Generator";
import { ICompileOptions } from "./compiler/Generator/ICompileOptions";
import { Lexer } from "./compiler/Lexer"
import { Parser } from "./compiler/Parser";

export function compileToJs(code: string, options: ICompileOptions): string
{
    var l = new Lexer(code);
    let tokens = l.tokenize();

    var p = new Parser(tokens);
    let parses = p.parse();

    var g = new Generator(parses, options)
    let generated = g.generate();

    return generated
}