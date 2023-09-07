export default class HtmlBuilder {
    //@ts-expect-error
    _element;
    constructor() { }
    createElement(el, text) {
        this._element = document.createElement(el);
        if (text) {
            this._element.innerText = text;
        }
        return this;
    }
    getElement(id, elClass) {
        if (id) {
            this._element = document.getElementById(id);
        }
        else {
            this._element = document.querySelector(`.${elClass}`);
        }
        return this;
    }
    append(listElements) {
        listElements.forEach((e) => {
            this._element.appendChild(e);
        });
        return this;
    }
    classes(list) {
        this._element.classList.add(...list);
        return this;
    }
    complete() {
        return this._element;
    }
}
