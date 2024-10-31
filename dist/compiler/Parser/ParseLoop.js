"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseLoop = void 0;
const ParseType_1 = require("./ParseType");
class ParseLoop extends ParseType_1.ParseType {
    constructor(condition, block) {
        super();
        this.condition = condition;
        this.block = block;
    }
}
exports.ParseLoop = ParseLoop;
//# sourceMappingURL=ParseLoop.js.map