"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const JSGenerator_1 = require("./Generator/JSGenerator");
class Generator {
    constructor(parses, options) {
        this.parses = parses;
        this.options = options;
    }
    generate() {
        const generator = new JSGenerator_1.JSGenerator(this.options);
        return generator.build(this.parses);
    }
}
exports.Generator = Generator;
//# sourceMappingURL=Generator.js.map