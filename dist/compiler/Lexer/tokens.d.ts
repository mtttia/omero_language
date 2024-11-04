export declare const keyWords: {
    variableAssignment: string;
    valueAssignment: string;
    args: string;
    condition: string;
    orStatement: string;
    notStatement: string;
    conditionEnd: string;
    comparison: string;
    ifStatement: string;
    ifTrue: string;
    ifFalse: string;
    comment: string;
    ifEnd: string;
    plus: string;
    minus: string;
    times: string;
    division: string;
    loopStatement: string;
    loopEnd: string;
    printNumber: string;
    printChar: string;
    greaterThan: string;
    greaterOrEqualTo: string;
    equalTo: string;
};
export declare const registers: string[];
export declare enum TokenType {
    keyWorld = 0,
    register = 1,
    commandEnd = 2,
    bracketOpen = 3,
    bracketClose = 4,
    number = 5
}
