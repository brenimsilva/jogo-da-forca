import HtmlBuilder from "./HtmlBuilder.js";

export type WordType = {
    word: string;
    size: number;
    rightLettersIndex: Array<number>;
    completed: boolean;
}

export type GuessResponse = {
    message: string;

}

export default class Game {
    private _lcContainer = document.getElementById("letter_choice_container") as HTMLDivElement;
    private _lettersContainer = document.getElementById("letters_container") as HTMLDivElement;
    private _wrongLettersContainer = document.getElementById("wrong_letters") as HTMLDivElement;
    private _words = ["estudar", "javascript", "memoria", "processador", "react", "angular", "svelte", "discord", "python", "ruby", "programacao"];
    private _tentativasElement = document.getElementById("tentativas") as HTMLDivElement;
    private _alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "z"];
    private _wrongLetters: Array<string> = [];
    public word: WordType = {} as WordType;
    public chances: number = 7;
    constructor() {}

    start() {
        this.word = this._generateWord();
        this._generateLettersScreen();
        this._refreshWordScreen();
        this._tentativasElement.innerText = this.chances.toString();
    }

    private _refreshWrongLettersScreen() {
        this._wrongLettersContainer.innerHTML = "";
        const wrongLetters = this._wrongLetters.map(l => {
            const el = new HtmlBuilder().createElement("div", l).classes(["wrong_letter"]).complete();
            return el;
        })
        
        wrongLetters.forEach(e => {
            this._wrongLettersContainer.appendChild(e);
        })
    }

    private _refreshWordScreen() {
        let incompleteWord = "";
        this.word.word.split("").forEach((l, i) => {
            if(this.word.rightLettersIndex.includes(i)) incompleteWord += l + " ";
            else incompleteWord += "_ "
        });
        this._lettersContainer.innerText = incompleteWord;
    }

    private _generateLettersScreen() {
        const letterHtmlList = this._alphabet.map((e) => {
            const el = new HtmlBuilder().createElement("div").classes(["letter_choice"]).complete();
            el.innerText = e;
            el.addEventListener('click', () => this.guessLetter(e));
            return el;
        })
        const el = new HtmlBuilder().getElement("letter_choice_container").classes([]).append(letterHtmlList).complete();
    }

    guessLetter(letter: string) {
        if(this.chances <= 0) {
            return;
        }
        const letterArray = this.word.word.split("")

        if(!letterArray.includes(letter)) {
            this.chances--
            this._tentativasElement.innerText = this.chances.toString();
            this._wrongLetters.push(letter);
            this._refreshWrongLettersScreen();
            if(this._checkLoose()) this._loose();
            return;
        }
        letterArray.forEach((l,i) => {
            if(letter === l && !this.word.rightLettersIndex.includes(i)) { 
                this.word.rightLettersIndex.push(i);
            }
            else if(this.word.rightLettersIndex.includes(i)) {

            }
        });
        if(this._checkWin()) this._win();
        this._refreshWordScreen();
    }

    private _win() {

    }

    private _loose() {
        
    }

    private _checkWin() {
        return this.word.rightLettersIndex.length === this.word.size;
    }

    private _checkLoose() {
        return this.chances <= 0;
    }
    private _generateWord(): WordType {
        const wordIndex = Math.trunc(Math.random() * this._words.length);
        const word = this._words[wordIndex];
        return {
            completed: false,
            rightLettersIndex: [],
            size: word.length,
            word
        }
    }
}