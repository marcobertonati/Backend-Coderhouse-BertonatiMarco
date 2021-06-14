"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suma = void 0;
var Suma = /** @class */ (function () {
    function Suma(number1, number2) {
        this.number1 = 0;
        this.number2 = 0;
        this.number1 = number1;
        this.number2 = number2;
    }
    Suma.prototype.resultado = function () {
        return this.number1 + this.number2;
    };
    return Suma;
}());
exports.Suma = Suma;
