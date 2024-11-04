import { ParseAssignment } from "../Parser/ParseAssignment";
import { ParseComparison } from "../Parser/ParseComparison";
import { ParseCondition } from "../Parser/ParseCondition";
import { ParseEmpty } from "../Parser/ParseEmpty";
import { ParseIf } from "../Parser/ParseIf";
import { ParseLoop } from "../Parser/ParseLoop";
import { ParseOperand } from "../Parser/ParseOperand";
import { ParseOracle } from "../Parser/ParseOracle";
import { ParsePrint } from "../Parser/ParsePrint";
export class IOmeroGenerator {
    constructor(compileOptions) {
        this.argsVariableName = "args";
        this.compileOptions = compileOptions;
    }
    build(parses) {
        return this.generateHeader() + "\n" + this.generate(parses);
    }
    generate(parses) {
        return parses.map(p => {
            if (p instanceof ParseAssignment) {
                return this.generateAssignment(p);
            }
            else if (p instanceof ParseComparison) {
                return this.generateComparison(p);
            }
            else if (p instanceof ParseCondition) {
                return this.generateCondition(p);
            }
            else if (p instanceof ParseEmpty) {
                return this.generateEmpty(p);
            }
            else if (p instanceof ParseIf) {
                return this.generateIf(p);
            }
            else if (p instanceof ParseLoop) {
                return this.generateLoop(p);
            }
            else if (p instanceof ParseOperand) {
                return this.generateOperand(p);
            }
            else if (p instanceof ParseOracle) {
                return this.generateOracle(p);
            }
            else if (p instanceof ParsePrint) {
                return this.generatePrint(p);
            }
        }).join("\n");
    }
}
//# sourceMappingURL=IOmeroGenerator.js.map