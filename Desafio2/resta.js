"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resta = void 0;
var Resta = /** @class */ (function () {
    function Resta(number1, number2) {
        this.number1 = 0;
        this.number2 = 0;
        this.number1 = number1;
        this.number2 = number2;
    }
    Resta.prototype.resultado = function () {
        return this.number1 - this.number2;
    };
    return Resta;
}());
exports.Resta = Resta;
