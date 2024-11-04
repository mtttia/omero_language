import { compileToJs } from "../src"

test("Simple program compile to JS", () =>
{
    const compiled = compileToJs(`My dear GOD Ares you are now Oracle prophecy 1

My dear GOD Zeus you are now (((30 allied with 40) without 10) times 10) schism 5
My dear GOD Apollo you are now Ares

Duel Zeus Kill Apollo
Paride give golden apple
Proposal Afrodite
    Omero: Here the on true code
Proposal Atena
    Omero: Here the on false code
Troia Destruction

Titanomachy
    Titanomachy Or Loose
        Duel Zeus Kill (Oracle prophecy 2 allied with 5) without Apollo
        Duel Loose Zeus Die both with Ares
    Gods won
    Duel Or Zeus Fight with 10
Gods won
Penelope Weave the web
    Omero: here go the code
Ulisse back to Itaca

goddess say Zeus Omero: print the number
oh goddess tell me Zeus Omero: convert to the correspondent char`, {
        arguments: ["1", "2"],
        useInputArgs: false
    })

    expect(compiled).toMatchSnapshot();
})

test("Simple program compile to JS with \\r\\n", () =>
{
    const compiled = compileToJs("My dear GOD Ares you are now Oracle prophecy 1\r\n\r\nMy dear GOD Zeus you are now (((30 allied with 40) without 10) times 10) schism 5\r\nMy dear GOD Apollo you are now Ares\r\n\r\nDuel Zeus Kill Apollo\r\nParide give golden apple\r\nProposal Afrodite\r\n    Omero: Here the on true code\r\nProposal Atena\r\n    Omero: Here the on false code\r\nTroia Destruction\r\n\r\nTitanomachy\r\n    Titanomachy Or Loose\r\n        Duel Zeus Kill (Oracle prophecy 2 allied with 5) without Apollo\r\n        Duel Loose Zeus Die both with Ares\r\n    Gods won\r\n    Duel Or Zeus Fight with 10\r\nGods won\r\nPenelope Weave the web\r\n    Omero: here go the code\r\nUlisse back to Itaca\r\n\r\ngoddess say Zeus Omero: print the number\r\noh goddess tell me Zeus Omero: convert to the correspondent char", {
        arguments: ["1", "2"],
        useInputArgs: false
    })

    expect(compiled).toMatchSnapshot()
})