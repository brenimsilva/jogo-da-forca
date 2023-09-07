export default class HtmlBuilder {
    //@ts-expect-error
    private _element: HTMLElement;
    constructor() {}

    createElement(el: keyof HTMLElementTagNameMap, text?: string) {
        this._element = document.createElement(el);
        if(text) {
            this._element.innerText = text;
        }
        return this;
    }

    getElement(id?: string, elClass?: string) {
        if(id) {
            this._element = document.getElementById(id)!;
        } else {
            this._element = document.querySelector(`.${elClass}`)!;
        }
        return this;
    }

    append(listElements: Array<HTMLElement>) {
        listElements.forEach((e) => {
            this._element.appendChild(e);
        });
        return this;
    }

    classes(list: Array<string>) {
        this._element.classList.add(...list);
        return this;
    }
    
    complete() {
        return this._element;
    }

}