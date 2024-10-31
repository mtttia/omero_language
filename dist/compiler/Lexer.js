"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
const tokens_1 = require("./Lexer/tokens");
class Lexer {
    constructor(input) {
        this.registers = [];
        this.keyWords = [];
        this.input = input;
        this.position = 0;
        this.tokens = [];
        this.registers = tokens_1.registers.map(r => r);
        this.keyWords = Object.values(tokens_1.keyWords).map(kw => kw);
    }
    tokenize() {
        while (this.position < this.input.length) {
            let char = this.input[this.position];
            if (char === ' ') {
                this.position++;
                continue;
            }
            if (char === '\n') {
                this.tokens.push({
                    type: tokens_1.TokenType.commandEnd,
                    value: char
                });
                this.position++;
                continue;
            }
            if (char == '(') {
                this.tokens.push({
                    type: tokens_1.TokenType.bracketOpen,
                    value: char
                });
                this.position++;
                continue;
            }
            if (char == ')') {
                this.tokens.push({
                    type: tokens_1.TokenType.bracketClose,
                    value: char
                });
                this.position++;
                continue;
            }
            if (/[0-9]/.test(char)) {
                let value = '';
                while (this.position < this.input.length && /[0-9]/.test(this.input[this.position])) {
                    value += this.input[this.position];
                    this.position++;
                }
                this.tokens.push({
                    type: tokens_1.TokenType.number,
                    value: value
                });
                continue;
            }
            // Handle identifiers and keywords
            let value = '';
            let found = false;
            while (this.position < this.input.length && this.input[this.position] !== '\n') {
                value += this.input[this.position];
                this.position++;
                if (this.keyWords.includes(value)) {
                    if (this.input[this.position] == "\n" || this.input[this.position] == " ") {
                        found = true;
                        if (value == tokens_1.keyWords.comment) {
                            while (this.position < this.input.length && this.input[this.position] !== '\n') {
                                this.position++;
                            }
                        }
                        else {
                            this.tokens.push({
                                type: tokens_1.TokenType.keyWorld,
                                value: value
                            });
                        }
                        break;
                    }
                }
                else if (this.registers.includes(value)) {
                    if (this.input[this.position] == "\n" || this.input[this.position] == " ") {
                        found = true;
                        this.tokens.push({
                            type: tokens_1.TokenType.register,
                            value: value
                        });
                        break;
                    }
                }
            }
            if (!found && value.length > 0) {
                throw new Error("Unexpected Token");
            }
            continue;
        }
        return this.tokens;
    }
}
exports.Lexer = Lexer;
//# sourceMappingURL=Lexer.js.map