import { keyWords, TokenType } from "./Lexer/tokens";
import { ParseAssignment } from "./Parser/ParseAssignment";
import { ParseComparison } from "./Parser/ParseComparison";
import { ComparisonType, ParseCondition } from "./Parser/ParseCondition";
import { ParseOperand } from "./Parser/ParseOperand";
import { ParseIf } from "./Parser/ParseIf";
import { ParseEmpty } from "./Parser/ParseEmpty";
import { ParseLoop } from "./Parser/ParseLoop";
import { ParsePrint, PrintType } from "./Parser/ParsePrint";
import { ParseOracle } from "./Parser/ParseOracle";
export class Parser {
    constructor(tokens) {
        this.currentCondition = null;
        this.tokens = tokens.filter(t => t.type != TokenType.commandEnd);
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
        return this.match(TokenType.keyWorld, keyWords.plus) ||
            this.match(TokenType.keyWorld, keyWords.minus) ||
            this.match(TokenType.keyWorld, keyWords.times) ||
            this.match(TokenType.keyWorld, keyWords.division);
    }
    matchComparisonOperator() {
        return this.match(TokenType.keyWorld, keyWords.greaterOrEqualTo) ||
            this.match(TokenType.keyWorld, keyWords.greaterThan) ||
            this.match(TokenType.keyWorld, keyWords.equalTo);
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
        if (this.match(TokenType.keyWorld, keyWords.variableAssignment)) {
            this.consume();
            return this.parseVariableAssignment();
        }
        else if (this.match(TokenType.keyWorld, keyWords.comparison)) {
            this.consume();
            //consume the type, only support and for first one
            this.getConditionType();
            let negate = false;
            if (this.match(TokenType.keyWorld, keyWords.notStatement)) {
                this.consume();
                negate = true;
            }
            const comparison = this.parseComparison();
            this.currentCondition = new ParseCondition();
            this.currentCondition.addComparison(comparison, ComparisonType.and, negate);
            return new ParseEmpty();
        }
        else if (this.match(TokenType.keyWorld, keyWords.condition)) {
            this.consume();
            //consume the type, only support and for first one
            this.getConditionType();
            this.currentCondition = this.parseCondition();
            return new ParseEmpty();
        }
        else if (this.match(TokenType.keyWorld, keyWords.ifStatement)) {
            this.consume();
            return this.parseIfStatement();
        }
        else if (this.match(TokenType.keyWorld, keyWords.comment)) {
            this.consume();
            return this.parseComment();
        }
        else if (this.match(TokenType.keyWorld, keyWords.loopStatement)) {
            this.consume();
            return this.parseLoop();
        }
        else if (this.match(TokenType.keyWorld, keyWords.printNumber)) {
            this.consume();
            return this.parsePrint(PrintType.number);
        }
        else if (this.match(TokenType.keyWorld, keyWords.printChar)) {
            this.consume();
            return this.parsePrint(PrintType.string);
        }
        else {
            throw this.unexecutedToken();
        }
    }
    parseVariableAssignment() {
        const registerName = this.assert(TokenType.register).value;
        this.assert(TokenType.keyWorld, keyWords.valueAssignment);
        return new ParseAssignment(registerName, this.parseOperand());
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
        const comparison = new ParseComparison(operandLeft, comparisonOp, operandRight);
        return comparison;
    }
    parseCondition() {
        const condition = new ParseCondition();
        while (!this.match(TokenType.keyWorld, keyWords.conditionEnd)) {
            if (this.match(TokenType.keyWorld, keyWords.condition)) {
                this.consume();
                const type = this.getConditionType();
                let negate = false;
                if (this.match(TokenType.keyWorld, keyWords.notStatement)) {
                    this.consume();
                    negate = true;
                }
                condition.addComparison(this.parseCondition(), type, negate);
            }
            else if (this.match(TokenType.keyWorld, keyWords.comparison)) {
                this.consume();
                const type = this.getConditionType();
                let negate = false;
                if (this.match(TokenType.keyWorld, keyWords.notStatement)) {
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
        this.assert(TokenType.keyWorld, keyWords.ifTrue);
        const ifTrueBlock = [];
        const ifFalseBlock = [];
        let processTrue = true;
        while (!this.match(TokenType.keyWorld, keyWords.ifEnd)) {
            if (this.match(TokenType.keyWorld, keyWords.ifFalse)) {
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
        const parse = new ParseIf(condition, ifTrueBlock, ifFalseBlock);
        return parse;
    }
    parseComment() {
        return new ParseEmpty();
    }
    parseLoop() {
        const condition = this.currentCondition;
        if (condition == null) {
            throw this.unexecutedToken();
        }
        this.currentCondition = null;
        const block = [];
        while (!this.match(TokenType.keyWorld, keyWords.loopEnd)) {
            block.push(this.parseStatement());
        }
        this.consume();
        const parse = new ParseLoop(condition, block);
        return parse;
    }
    parsePrint(type) {
        const operation = this.parseOperand();
        return new ParsePrint(operation, type);
    }
    getConditionType() {
        let type = ComparisonType.and;
        if (this.match(TokenType.keyWorld, keyWords.orStatement)) {
            this.consume();
            type = ComparisonType.or;
        }
        return type;
    }
    parseOperand() {
        //manage first operand
        let left = "";
        if (this.match(TokenType.bracketOpen)) {
            this.consume();
            left = this.parseOperand();
            this.assert(TokenType.bracketClose);
        }
        else {
            if (this.match(TokenType.register) || this.match(TokenType.number)) {
                left = this.consume().value;
            }
            else if (this.match(TokenType.keyWorld, keyWords.args)) {
                this.consume();
                if (this.match(TokenType.register) || this.match(TokenType.number)) {
                    left = new ParseOracle(this.consume().value);
                }
                else {
                    throw this.unexecutedToken();
                }
            }
            else {
                throw this.unexecutedToken();
            }
        }
        const type = new ParseOperand(left);
        let operand;
        let right;
        if (this.matchOperation()) {
            operand = this.consume().value;
        }
        else {
            return type;
        }
        if (this.match(TokenType.bracketOpen)) {
            this.consume();
            right = this.parseOperand();
        }
        else {
            if (this.match(TokenType.register) || this.match(TokenType.number)) {
                right = this.consume().value;
            }
            else if (this.match(TokenType.keyWorld, keyWords.args)) {
                this.consume();
                if (this.match(TokenType.register) || this.match(TokenType.number)) {
                    right = new ParseOracle(this.consume().value);
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
//# sourceMappingURL=Parser.js.map