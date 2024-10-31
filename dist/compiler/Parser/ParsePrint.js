"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsePrint = exports.PrintType = void 0;
const ParseType_1 = require("./ParseType");
var PrintType;
(function (PrintType) {
    PrintType[PrintType["number"] = 0] = "number";
    PrintType[PrintType["string"] = 1] = "string";
})(PrintType || (exports.PrintType = PrintType = {}));
class ParsePrint extends ParseType_1.ParseType {
    constructor(operand, printType) {
        super();
        this.operand = operand;
        this.printType = printType;
    }
}
exports.ParsePrint = ParsePrint;
//# sourceMappingURL=ParsePrint.js.map