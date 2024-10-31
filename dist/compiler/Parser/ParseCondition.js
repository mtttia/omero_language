"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseCondition = exports.ComparisonType = void 0;
const ParseType_1 = require("./ParseType");
var ComparisonType;
(function (ComparisonType) {
    ComparisonType[ComparisonType["and"] = 0] = "and";
    ComparisonType[ComparisonType["or"] = 1] = "or";
})(ComparisonType || (exports.ComparisonType = ComparisonType = {}));
class ParseCondition extends ParseType_1.ParseType {
    constructor() {
        super();
        this.comparisons = [];
    }
    addComparison(comparison, type, negate) {
        this.comparisons.push({
            condition: comparison,
            type: type,
            negate: negate
        });
    }
}
exports.ParseCondition = ParseCondition;
//# sourceMappingURL=ParseCondition.js.map