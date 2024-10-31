"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenType = exports.registers = exports.keyWords = void 0;
exports.keyWords = {
    variableAssignment: "My dear GOD",
    valueAssignment: "you are now",
    args: "Oracle prophecy",
    condition: "Titanomachy",
    orStatement: "Or",
    notStatement: "Loose",
    conditionEnd: "Gods won",
    comparison: "Duel",
    ifStatement: "Paride give golden apple",
    ifTrue: "Proposal Afrodite",
    ifFalse: "Proposal Atena",
    comment: "Omero:",
    ifEnd: "Troia Destruction",
    plus: "allied with",
    minus: "without",
    times: "times",
    division: "schism",
    loopStatement: "Penelope Weave the web",
    loopEnd: "Ulisse back to Itaca",
    printNumber: "goddess say",
    printChar: "oh goddess tell me",
    greaterThan: "Kill",
    greaterOrEqualTo: "Fight with",
    equalTo: "Die both with",
};
exports.registers = [
    "Ade", "Afrodite", "Apollo", "Ares", "Artemide", "Atena", "Demetra", "Dioniso", "Efesto", "Era", "Ermes", "Poseidone", "Zeus"
];
var TokenType;
(function (TokenType) {
    TokenType[TokenType["keyWorld"] = 0] = "keyWorld";
    TokenType[TokenType["register"] = 1] = "register";
    TokenType[TokenType["commandEnd"] = 2] = "commandEnd";
    TokenType[TokenType["bracketOpen"] = 3] = "bracketOpen";
    TokenType[TokenType["bracketClose"] = 4] = "bracketClose";
    TokenType[TokenType["number"] = 5] = "number";
})(TokenType || (exports.TokenType = TokenType = {}));
//# sourceMappingURL=tokens.js.map