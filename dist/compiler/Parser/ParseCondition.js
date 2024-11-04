import { ParseType } from "./ParseType";
export var ComparisonType;
(function (ComparisonType) {
    ComparisonType[ComparisonType["and"] = 0] = "and";
    ComparisonType[ComparisonType["or"] = 1] = "or";
})(ComparisonType || (ComparisonType = {}));
export class ParseCondition extends ParseType {
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
//# sourceMappingURL=ParseCondition.js.map