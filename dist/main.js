"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator_1 = require("./compiler/Generator");
const Lexer_1 = require("./compiler/Lexer");
const Parser_1 = require("./compiler/Parser");
const code = `
My dear GOD Ares you are now Oracle prophecy 1

My dear GOD Zeus you are now (((30 allied with 40) without 10) times 10) schism 5
My dear GOD Apollo you are now Ares

Duel Zeus Kill Apollo
Paride give golden apple
Proposal Afrodite
    Omero: Here the on true code
Proposal Atena
    Omero: Here the on false code
Troia Destruction

Titanomachy
    Titanomachy Or Loose
        Duel Zeus Kill (Oracle prophecy 2 allied with 5) without Apollo
        Duel Loose Zeus Die both with Ares
    Gods won
    Duel Or Zeus Fight with 10
Gods won
Penelope Weave the web
    Omero: here go the code
Ulisse back to Itaca

goddess say Zeus Omero: print the number
oh goddess tell me Zeus Omero: convert to the correspondent char
`;
const defaultOptions = {
    arguments: ["1"],
    useInputArgs: false
};
var l = new Lexer_1.Lexer(code);
let tokens = l.tokenize();
var p = new Parser_1.Parser(tokens);
let parses = p.parse();
var g = new Generator_1.Generator(parses, defaultOptions);
let generated = g.generate();
console.log(generated);
//# sourceMappingURL=main.js.map