"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSGenerator = void 0;
const tokens_1 = require("../Lexer/tokens");
const ParseComparison_1 = require("../Parser/ParseComparison");
const ParseCondition_1 = require("../Parser/ParseCondition");
const ParseOperand_1 = require("../Parser/ParseOperand");
const ParseOracle_1 = require("../Parser/ParseOracle");
const ParsePrint_1 = require("../Parser/ParsePrint");
const IOmeroGenerator_1 = require("./IOmeroGenerator");
class JSGenerator extends IOmeroGenerator_1.IOmeroGenerator {
    generateHeader() {
        return tokens_1.registers.map(r => `let ${r} = null;`).join("") + this.getArguments();
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
            case tokens_1.keyWords.greaterThan:
                operation = ">";
                break;
            case tokens_1.keyWords.greaterOrEqualTo:
                operation = ">=";
                break;
            case tokens_1.keyWords.equalTo:
                operation = "==";
        }
        return `(${this.generateOperand(parse.operandLeft)}) ${operation} (${this.generateOperand(parse.operandRight)})`;
    }
    generateCondition(parse) {
        let first = true;
        return parse.comparisons.map(c => {
            let type = "";
            switch (c.type) {
                case ParseCondition_1.ComparisonType.and:
                    type = first ? "" : "&&";
                    break;
                case ParseCondition_1.ComparisonType.or:
                    type = first ? "" : "||";
                    break;
            }
            let condition = "";
            if (c.condition instanceof ParseCondition_1.ParseCondition) {
                condition = this.generateCondition(c.condition);
            }
            else if (c.condition instanceof ParseComparison_1.ParseComparison) {
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
        if (parse.left instanceof ParseOracle_1.ParseOracle) {
            left = this.generateOracle(parse.left);
        }
        else if (parse.left instanceof ParseOperand_1.ParseOperand) {
            left = `(${this.generateOperand(parse.left)})`;
        }
        else {
            left = parse.left;
        }
        let right = "";
        if (parse.right instanceof ParseOracle_1.ParseOracle) {
            right = this.generateOracle(parse.right);
        }
        else if (parse.right instanceof ParseOperand_1.ParseOperand) {
            right = `(${this.generateOperand(parse.right)})`;
        }
        else {
            right = parse.right || "";
        }
        let operand = "";
        switch (parse.operand) {
            case tokens_1.keyWords.plus:
                operand = "+";
                break;
            case tokens_1.keyWords.minus:
                operand = "-";
                break;
            case tokens_1.keyWords.times:
                operand = "*";
                break;
            case tokens_1.keyWords.division:
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
            case ParsePrint_1.PrintType.number:
                print = this.generateOperand(parse.operand);
                break;
            case ParsePrint_1.PrintType.string:
                print = `String.fromCharCode(${this.generateOperand(parse.operand)})`;
                break;
        }
        return `console.log(${print})`;
    }
}
exports.JSGenerator = JSGenerator;
//# sourceMappingURL=JSGenerator.js.map