"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileToJs = compileToJs;
const Generator_1 = require("./compiler/Generator");
const Lexer_1 = require("./compiler/Lexer");
const Parser_1 = require("./compiler/Parser");
function compileToJs(code, options) {
    var l = new Lexer_1.Lexer(code);
    let tokens = l.tokenize();
    var p = new Parser_1.Parser(tokens);
    let parses = p.parse();
    var g = new Generator_1.Generator(parses, options);
    let generated = g.generate();
    return generated;
}
/**
 * Compile Options example
 *
 * const defaultOptions: ICompileOptions = {
 *     arguments: ["1"],
 *     useInputArgs: false
 * }
 */ 
//# sourceMappingURL=index.js.map