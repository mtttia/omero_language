import { keyWords, registers } from "../Lexer/tokens";
import { ParseComparison } from "../Parser/ParseComparison";
import { ComparisonType, ParseCondition } from "../Parser/ParseCondition";
import { ParseOperand } from "../Parser/ParseOperand";
import { ParseOracle } from "../Parser/ParseOracle";
import { PrintType } from "../Parser/ParsePrint";
import { IOmeroGenerator } from "./IOmeroGenerator";
export class JSGenerator extends IOmeroGenerator {
    generateHeader() {
        return registers.map(r => `let ${r} = null;`).join("") + this.getArguments();
    }
    getArguments() {
        if (this.compileOptions.useInputArgs) {
            return `let ${this.argsVariableName} = process.argv`;
        }
        else {
            return `let ${this.argsVariableName} = [${this.compileOptions.arguments.join(", ")}]`;
        }
    }
    generateAssignment(parse) {
        return `${parse.register} = ${this.generateOperand(parse.operand)}`;
    }
    generateComparison(parse) {
        let operation = "";
        switch (parse.operation) {
            case keyWords.greaterThan:
                operation = ">";
                break;
            case keyWords.greaterOrEqualTo:
                operation = ">=";
                break;
            case keyWords.equalTo:
                operation = "==";
        }
        return `(${this.generateOperand(parse.operandLeft)}) ${operation} (${this.generateOperand(parse.operandRight)})`;
    }
    generateCondition(parse) {
        let first = true;
        return parse.comparisons.map(c => {
            let type = "";
            switch (c.type) {
                case ComparisonType.and:
                    type = first ? "" : "&&";
                    break;
                case ComparisonType.or:
                    type = first ? "" : "||";
                    break;
            }
            let condition = "";
            if (c.condition instanceof ParseCondition) {
                condition = this.generateCondition(c.condition);
            }
            else if (c.condition instanceof ParseComparison) {
                condition = this.generateComparison(c.condition);
            }
            if (first) {
                first = false;
            }
            return `${type} ${c.negate ? "!" : ""} (${condition})`;
        }).join(" ");
    }
    generateEmpty(parse) {
        return "";
    }
    generateIf(parse) {
        return `if(${this.generateCondition(parse.condition)}){${this.generate(parse.blockTrue)}}else{${this.generate(parse.blockFalse)}}`;
    }
    generateLoop(parse) {
        return `while(${this.generateCondition(parse.condition)}){${this.generate(parse.block)}}`;
    }
    generateOperand(parse) {
        let left = "";
        if (parse.left instanceof ParseOracle) {
            left = this.generateOracle(parse.left);
        }
        else if (parse.left instanceof ParseOperand) {
            left = `(${this.generateOperand(parse.left)})`;
        }
        else {
            left = parse.left;
        }
        let right = "";
        if (parse.right instanceof ParseOracle) {
            right = this.generateOracle(parse.right);
        }
        else if (parse.right instanceof ParseOperand) {
            right = `(${this.generateOperand(parse.right)})`;
        }
        else {
            right = parse.right || "";
        }
        let operand = "";
        switch (parse.operand) {
            case keyWords.plus:
                operand = "+";
                break;
            case keyWords.minus:
                operand = "-";
                break;
            case keyWords.times:
                operand = "*";
                break;
            case keyWords.division:
                operand = "/";
                break;
        }
        return `${left} ${operand} ${right}`;
    }
    generateOracle(parse) {
        return `${this.argsVariableName}[${parse.index - 1}]`;
    }
    generatePrint(parse) {
        let print = "";
        switch (parse.printType) {
            case PrintType.number:
                print = this.generateOperand(parse.operand);
                break;
            case PrintType.string:
                print = `String.fromCharCode(${this.generateOperand(parse.operand)})`;
                break;
        }
        return `console.log(${print})`;
    }
}
//# sourceMappingURL=JSGenerator.js.map