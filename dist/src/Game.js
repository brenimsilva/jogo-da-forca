import HtmlBuilder from "./HtmlBuilder.js";
export default class Game {
    _lcContainer = document.getElementById("letter_choice_container");
    _lettersContainer = document.getElementById("letters_container");
    _words = ["Estudar", "Javascript", "Memoria", "Processador", "React", "Angular", "Svelte", "Discord", "Python", "Ruby", "Programacao"];
    _tentativasElement = document.getElementById("tentativas");
    _alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "z"];
    word = {};
    chances = 7;
    constructor() { }
    start() {
        this.word = this._generateWord();
        this._generateLettersScreen();
        this._refreshWordScreen();
        this._tentativasElement.innerText = this.chances.toString();
    }
    _refreshWordScreen() {
        let incompleteWord = "";
        this.word.word.split("").forEach((l, i) => {
            if (this.word.rightLettersIndex.includes(i))
                incompleteWord += l + " ";
            else
                incompleteWord += "_ ";
        });
        this._lettersContainer.innerText = incompleteWord;
    }
    _generateLettersScreen() {
        const letterHtmlList = this._alphabet.map((e) => {
            const el = new HtmlBuilder().createElement("div").classes(["letter_choice"]).complete();
            el.innerText = e;
            el.addEventListener('click', () => this.guessLetter(e));
            return el;
        });
        const el = new HtmlBuilder().getElement("letter_choice_container").classes([]).append(letterHtmlList).complete();
    }
    guessLetter(letter) {
        if (this.chances <= 0) {
            return;
        }
        const letterArray = this.word.word.split("");
        if (!letterArray.includes(letter)) {
            this.chances--;
            this._tentativasElement.innerText = this.chances.toString();
            if (this._checkLoose())
                this._loose();
            return;
        }
        letterArray.forEach((l, i) => {
            if (letter === l && !this.word.rightLettersIndex.includes(i)) {
                this.word.rightLettersIndex.push(i);
            }
            else if (this.word.rightLettersIndex.includes(i)) {
            }
        });
        if (this._checkWin())
            this._win();
        this._refreshWordScreen();
    }
    _win() {
    }
    _loose() {
    }
    _checkWin() {
        return this.word.rightLettersIndex.length === this.word.size;
    }
    _checkLoose() {
        return this.chances <= 0;
    }
    _generateWord() {
        const wordIndex = Math.trunc(Math.random() * this._words.length);
        const word = this._words[wordIndex];
        return {
            completed: false,
            rightLettersIndex: [0, 1, 2, 3],
            size: word.length,
            word
        };
    }
}
