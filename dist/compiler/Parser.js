"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const tokens_1 = require("./Lexer/tokens");
const ParseAssignment_1 = require("./Parser/ParseAssignment");
const ParseComparison_1 = require("./Parser/ParseComparison");
const ParseCondition_1 = require("./Parser/ParseCondition");
const ParseOperand_1 = require("./Parser/ParseOperand");
const ParseIf_1 = require("./Parser/ParseIf");
const ParseEmpty_1 = require("./Parser/ParseEmpty");
const ParseLoop_1 = require("./Parser/ParseLoop");
const ParsePrint_1 = require("./Parser/ParsePrint");
const ParseOracle_1 = require("./Parser/ParseOracle");
class Parser {
    constructor(tokens) {
        this.currentCondition = null;
        this.tokens = tokens.filter(t => t.type != tokens_1.TokenType.commandEnd);
        this.position = 0;
    }
    parse() {
        const statements = [];
        while (this.position < this.tokens.length) {
            statements.push(this.parseStatement());
        }
        return statements;
    }
    peek() {
        return this.tokens[this.position];
    }
    consume() {
        return this.tokens[this.position++];
    }
    match(tokenType, tokenValue = null) {
        const token = this.peek();
        if (!token) {
            return false;
        }
        if (tokenType == token.type) {
            if (tokenValue === null || tokenValue == token.value) {
                return true;
            }
        }
        return false;
    }
    matchOperation() {
        return this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.plus) ||
            this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.minus) ||
            this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.times) ||
            this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.division);
    }
    matchComparisonOperator() {
        return this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.greaterOrEqualTo) ||
            this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.greaterThan) ||
            this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.equalTo);
    }
    assert(tokenType, tokenValue = null) {
        if (!this.match(tokenType, tokenValue)) {
            if (tokenValue) {
                throw new Error("Expected token: " + tokenValue);
            }
            else {
                throw this.unexecutedToken();
            }
        }
        else {
            return this.consume();
        }
    }
    unexecutedToken() {
        return new Error("Unexpected token");
    }
    parseStatement() {
        if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.variableAssignment)) {
            this.consume();
            return this.parseVariableAssignment();
        }
        else if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.comparison)) {
            this.consume();
            //consume the type, only support and for first one
            this.getConditionType();
            let negate = false;
            if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.notStatement)) {
                this.consume();
                negate = true;
            }
            const comparison = this.parseComparison();
            this.currentCondition = new ParseCondition_1.ParseCondition();
            this.currentCondition.addComparison(comparison, ParseCondition_1.ComparisonType.and, negate);
            return new ParseEmpty_1.ParseEmpty();
        }
        else if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.condition)) {
            this.consume();
            //consume the type, only support and for first one
            this.getConditionType();
            this.currentCondition = this.parseCondition();
            return new ParseEmpty_1.ParseEmpty();
        }
        else if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.ifStatement)) {
            this.consume();
            return this.parseIfStatement();
        }
        else if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.comment)) {
            this.consume();
            return this.parseComment();
        }
        else if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.loopStatement)) {
            this.consume();
            return this.parseLoop();
        }
        else if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.printNumber)) {
            this.consume();
            return this.parsePrint(ParsePrint_1.PrintType.number);
        }
        else if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.printChar)) {
            this.consume();
            return this.parsePrint(ParsePrint_1.PrintType.string);
        }
        else {
            throw this.unexecutedToken();
        }
    }
    parseVariableAssignment() {
        const registerName = this.assert(tokens_1.TokenType.register).value;
        this.assert(tokens_1.TokenType.keyWorld, tokens_1.keyWords.valueAssignment);
        return new ParseAssignment_1.ParseAssignment(registerName, this.parseOperand());
    }
    parseComparison() {
        let operandLeft = this.parseOperand();
        let comparisonOp;
        if (this.matchComparisonOperator()) {
            comparisonOp = this.consume().value;
        }
        else {
            throw this.unexecutedToken();
        }
        let operandRight = this.parseOperand();
        const comparison = new ParseComparison_1.ParseComparison(operandLeft, comparisonOp, operandRight);
        return comparison;
    }
    parseCondition() {
        const condition = new ParseCondition_1.ParseCondition();
        while (!this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.conditionEnd)) {
            if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.condition)) {
                this.consume();
                const type = this.getConditionType();
                let negate = false;
                if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.notStatement)) {
                    this.consume();
                    negate = true;
                }
                condition.addComparison(this.parseCondition(), type, negate);
            }
            else if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.comparison)) {
                this.consume();
                const type = this.getConditionType();
                let negate = false;
                if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.notStatement)) {
                    this.consume();
                    negate = true;
                }
                condition.addComparison(this.parseComparison(), type, negate);
            }
            else {
                throw this.unexecutedToken();
            }
        }
        this.consume();
        return condition;
    }
    parseIfStatement() {
        const condition = this.currentCondition;
        if (condition == null) {
            throw this.unexecutedToken();
        }
        this.currentCondition = null;
        this.assert(tokens_1.TokenType.keyWorld, tokens_1.keyWords.ifTrue);
        const ifTrueBlock = [];
        const ifFalseBlock = [];
        let processTrue = true;
        while (!this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.ifEnd)) {
            if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.ifFalse)) {
                processTrue = false;
                this.consume();
                continue;
            }
            if (processTrue) {
                ifTrueBlock.push(this.parseStatement());
            }
            else {
                ifFalseBlock.push(this.parseStatement());
            }
        }
        this.consume();
        const parse = new ParseIf_1.ParseIf(condition, ifTrueBlock, ifFalseBlock);
        return parse;
    }
    parseComment() {
        return new ParseEmpty_1.ParseEmpty();
    }
    parseLoop() {
        const condition = this.currentCondition;
        if (condition == null) {
            throw this.unexecutedToken();
        }
        this.currentCondition = null;
        const block = [];
        while (!this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.loopEnd)) {
            block.push(this.parseStatement());
        }
        this.consume();
        const parse = new ParseLoop_1.ParseLoop(condition, block);
        return parse;
    }
    parsePrint(type) {
        const operation = this.parseOperand();
        return new ParsePrint_1.ParsePrint(operation, type);
    }
    getConditionType() {
        let type = ParseCondition_1.ComparisonType.and;
        if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.orStatement)) {
            this.consume();
            type = ParseCondition_1.ComparisonType.or;
        }
        return type;
    }
    parseOperand() {
        //manage first operand
        let left = "";
        if (this.match(tokens_1.TokenType.bracketOpen)) {
            this.consume();
            left = this.parseOperand();
            this.assert(tokens_1.TokenType.bracketClose);
        }
        else {
            if (this.match(tokens_1.TokenType.register) || this.match(tokens_1.TokenType.number)) {
                left = this.consume().value;
            }
            else if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.args)) {
                this.consume();
                if (this.match(tokens_1.TokenType.register) || this.match(tokens_1.TokenType.number)) {
                    left = new ParseOracle_1.ParseOracle(this.consume().value);
                }
                else {
                    throw this.unexecutedToken();
                }
            }
            else {
                throw this.unexecutedToken();
            }
        }
        const type = new ParseOperand_1.ParseOperand(left);
        let operand;
        let right;
        if (this.matchOperation()) {
            operand = this.consume().value;
        }
        else {
            return type;
        }
        if (this.match(tokens_1.TokenType.bracketOpen)) {
            this.consume();
            right = this.parseOperand();
        }
        else {
            if (this.match(tokens_1.TokenType.register) || this.match(tokens_1.TokenType.number)) {
                right = this.consume().value;
            }
            else if (this.match(tokens_1.TokenType.keyWorld, tokens_1.keyWords.args)) {
                this.consume();
                if (this.match(tokens_1.TokenType.register) || this.match(tokens_1.TokenType.number)) {
                    right = new ParseOracle_1.ParseOracle(this.consume().value);
                }
                else {
                    throw this.unexecutedToken();
                }
            }
            else {
                throw this.unexecutedToken();
            }
        }
        type.setOperation(operand, right);
        return type;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map