import { keyWords, registers } from "../Lexer/tokens";
import { ParseAssignment } from "../Parser/ParseAssignment";
import { ParseComparison } from "../Parser/ParseComparison";
import { ComparisonType, ParseCondition } from "../Parser/ParseCondition";
import { ParseEmpty } from "../Parser/ParseEmpty";
import { ParseIf } from "../Parser/ParseIf";
import { ParseLoop } from "../Parser/ParseLoop";
import { ParseOperand } from "../Parser/ParseOperand";
import { ParseOracle } from "../Parser/ParseOracle";
import { ParsePrint, PrintType } from "../Parser/ParsePrint";
import { IOmeroGenerator } from "./IOmeroGenerator"

export class JSGenerator extends IOmeroGenerator
{

    generateHeader(): string
    {
        return registers.map(r => `let ${r} = null;`).join("") + this.getArguments()
    }

    getArguments()
    {
        if (this.compileOptions.useInputArgs)
        {
            return `let ${this.argsVariableName} = process.argv`
        }
        else
        {
            return `let ${this.argsVariableName} = [${this.compileOptions.arguments.join(", ")}]`
        }
    }

    generateAssignment(parse: ParseAssignment): string
    {
        return `${parse.register} = ${this.generateOperand(parse.operand)}`
    }
    generateComparison(parse: ParseComparison): string
    {
        let operation = "";
        switch (parse.operation)
        {
            case keyWords.greaterThan:
                operation = ">";
                break;
            case keyWords.greaterOrEqualTo:
                operation = ">="
                break;
            case keyWords.equalTo:
                operation = "=="
        }
        return `(${this.generateOperand(parse.operandLeft)}) ${operation} (${this.generateOperand(parse.operandRight)})`
    }
    generateCondition(parse: ParseCondition): string
    {
        let first: boolean = true
        return parse.comparisons.map(c =>
        {
            let type = "";
            switch (c.type)
            {
                case ComparisonType.and:
                    type = first ? "" : "&&";
                    break
                case ComparisonType.or:
                    type = first ? "" : "||";
                    break
            }

            let condition = "";
            if (c.condition instanceof ParseCondition)
            {
                condition = this.generateCondition(c.condition)
            }
            else if (c.condition instanceof ParseComparison)
            {
                condition = this.generateComparison(c.condition)
            }

            if (first)
            {
                first = false
            }

            return `${type} ${c.negate ? "!" : ""} (${condition})`
        }).join(" ")
    }
    generateEmpty(parse: ParseEmpty): string
    {
        return "";
    }
    generateIf(parse: ParseIf): string
    {
        return `if(${this.generateCondition(parse.condition)}){${this.generate(parse.blockTrue)}}else{${this.generate(parse.blockFalse)}}`;
    }
    generateLoop(parse: ParseLoop): string
    {
        return `while(${this.generateCondition(parse.condition)}){${this.generate(parse.block)}}`;
    }
    generateOperand(parse: ParseOperand): string
    {
        let left = "";
        if (parse.left instanceof ParseOracle)
        {
            left = this.generateOracle(parse.left);
        }
        else if (parse.left instanceof ParseOperand)
        {
            left = `(${this.generateOperand(parse.left)})`
        }
        else
        {
            left = parse.left
        }

        let right = "";
        if (parse.right instanceof ParseOracle)
        {
            right = this.generateOracle(parse.right);
        }
        else if (parse.right instanceof ParseOperand)
        {
            right = `(${this.generateOperand(parse.right)})`
        }
        else
        {
            right = parse.right || ""
        }

        let operand = ""
        switch (parse.operand)
        {
            case keyWords.plus:
                operand = "+"
                break
            case keyWords.minus:
                operand = "-"
                break
            case keyWords.times:
                operand = "*"
                break
            case keyWords.division:
                operand = "/"
                break;
        }

        return `${left} ${operand} ${right}`
    }

    generateOracle(parse: ParseOracle): string
    {
        return `${this.argsVariableName}[${parse.index - 1}]`;
    }

    generatePrint(parse: ParsePrint): string
    {
        let print = "";
        switch (parse.printType)
        {
            case PrintType.number:
                print = this.generateOperand(parse.operand)
                break
            case PrintType.string:
                print = `String.fromCharCode(${this.generateOperand(parse.operand)})`;
                break
        }

        return `console.log(${print})`
    }

}