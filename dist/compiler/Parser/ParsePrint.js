import { ParseType } from "./ParseType";
export var PrintType;
(function (PrintType) {
    PrintType[PrintType["number"] = 0] = "number";
    PrintType[PrintType["string"] = 1] = "string";
})(PrintType || (PrintType = {}));
export class ParsePrint extends ParseType {
    constructor(operand, printType) {
        super();
        this.operand = operand;
        this.printType = printType;
    }
}
//# sourceMappingURL=ParsePrint.js.map