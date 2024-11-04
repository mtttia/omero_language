import { JSGenerator } from "./Generator/JSGenerator";
export class Generator {
    constructor(parses, options) {
        this.parses = parses;
        this.options = options;
    }
    generate() {
        const generator = new JSGenerator(this.options);
        return generator.build(this.parses);
    }
}
//# sourceMappingURL=Generator.js.map