import { TokenType } from "./Lexer/tokens";
export interface Token {
    type: TokenType;
    value: any;
}
export declare class Lexer {
    private registers;
    private keyWords;
    private input;
    private position;
    private tokens;
    constructor(input: string);
    tokenize(): Token[];
}
