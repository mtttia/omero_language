export const keyWords = {
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
}

export const registers = [
    "Ade", "Afrodite", "Apollo", "Ares", "Artemide", "Atena", "Demetra", "Dioniso", "Efesto", "Era", "Ermes", "Poseidone", "Zeus"
]

export enum TokenType
{
    keyWorld, register, commandEnd, bracketOpen, bracketClose, number
}