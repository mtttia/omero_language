import { keyWords, registers, TokenType } from "./Lexer/tokens"

export interface Token
{
    type: TokenType,
    value: any
}

export class Lexer
{
    private registers: string[] = []
    private keyWords: string[] = []

    private input: string
    private position: number
    private tokens: Token[]

    constructor(input: string)
    {
        this.input = input;
        this.position = 0;
        this.tokens = [];
        this.registers = registers.map(r => r)
        this.keyWords = Object.values(keyWords).map(kw => kw)
    }

    tokenize()
    {
        while (this.position < this.input.length)
        {
            let char = this.input[this.position];

            if (char === ' ')
            {
                this.position++;
                continue;
            }

            if (char === '\n')
            {
                this.tokens.push({
                    type: TokenType.commandEnd,
                    value: char
                });
                this.position++;
                continue;
            }

            if (char == '(')
            {
                this.tokens.push({
                    type: TokenType.bracketOpen,
                    value: char
                })
                this.position++
                continue;
            }

            if (char == ')')
            {
                this.tokens.push({
                    type: TokenType.bracketClose,
                    value: char
                })
                this.position++
                continue;
            }

            if (/[0-9]/.test(char))
            {
                let value = '';
                while (this.position < this.input.length && /[0-9]/.test(this.input[this.position]))
                {
                    value += this.input[this.position];
                    this.position++;
                }
                this.tokens.push({
                    type: TokenType.number,
                    value: value
                })
                continue;
            }

            // Handle identifiers and keywords
            let value = '';
            let found = false;
            while (this.position < this.input.length && this.input[this.position] !== '\n')
            {
                value += this.input[this.position];
                this.position++;
                if (this.keyWords.includes(value))
                {
                    if (this.input[this.position] == "\n" || this.input[this.position] == " ")
                    {
                        found = true;
                        if (value == keyWords.comment)
                        {
                            while (this.position < this.input.length && this.input[this.position] !== '\n')
                            {
                                this.position++;
                            }
                        }
                        else
                        {
                            this.tokens.push({
                                type: TokenType.keyWorld,
                                value: value
                            });
                        }
                        break;
                    }
                }
                else if (this.registers.includes(value))
                {
                    if (this.input[this.position] == "\n" || this.input[this.position] == " ")
                    {
                        found = true;
                        this.tokens.push({
                            type: TokenType.register,
                            value: value
                        });
                        break;
                    }
                }
            }
            if (!found && value.length > 0)
            {
                throw new Error("Unexpected Token");
            }
            continue;
        }

        return this.tokens;
    }
}