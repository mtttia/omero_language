"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseIf = void 0;
const ParseType_1 = require("./ParseType");
class ParseIf extends ParseType_1.ParseType {
    constructor(condition, blockTrue, blockFalse) {
        super();
        this.condition = condition;
        this.blockTrue = blockTrue;
        this.blockFalse = blockFalse;
    }
}
exports.ParseIf = ParseIf;
//# sourceMappingURL=ParseIf.js.map