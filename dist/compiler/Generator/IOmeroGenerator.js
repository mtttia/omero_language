"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOmeroGenerator = void 0;
const ParseAssignment_1 = require("../Parser/ParseAssignment");
const ParseComparison_1 = require("../Parser/ParseComparison");
const ParseCondition_1 = require("../Parser/ParseCondition");
const ParseEmpty_1 = require("../Parser/ParseEmpty");
const ParseIf_1 = require("../Parser/ParseIf");
const ParseLoop_1 = require("../Parser/ParseLoop");
const ParseOperand_1 = require("../Parser/ParseOperand");
const ParseOracle_1 = require("../Parser/ParseOracle");
const ParsePrint_1 = require("../Parser/ParsePrint");
class IOmeroGenerator {
    constructor(compileOptions) {
        this.argsVariableName = "args";
        this.compileOptions = compileOptions;
    }
    build(parses) {
        return this.generateHeader() + "\n" + this.generate(parses);
    }
    generate(parses) {
        return parses.map(p => {
            if (p instanceof ParseAssignment_1.ParseAssignment) {
                return this.generateAssignment(p);
            }
            else if (p instanceof ParseComparison_1.ParseComparison) {
                return this.generateComparison(p);
            }
            else if (p instanceof ParseCondition_1.ParseCondition) {
                return this.generateCondition(p);
            }
            else if (p instanceof ParseEmpty_1.ParseEmpty) {
                return this.generateEmpty(p);
            }
            else if (p instanceof ParseIf_1.ParseIf) {
                return this.generateIf(p);
            }
            else if (p instanceof ParseLoop_1.ParseLoop) {
                return this.generateLoop(p);
            }
            else if (p instanceof ParseOperand_1.ParseOperand) {
                return this.generateOperand(p);
            }
            else if (p instanceof ParseOracle_1.ParseOracle) {
                return this.generateOracle(p);
            }
            else if (p instanceof ParsePrint_1.ParsePrint) {
                return this.generatePrint(p);
            }
        }).join("\n");
    }
}
exports.IOmeroGenerator = IOmeroGenerator;
//# sourceMappingURL=IOmeroGenerator.js.map