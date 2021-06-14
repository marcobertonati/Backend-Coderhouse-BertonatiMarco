"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function operacion(number1, number2, operator) {
    return __awaiter(this, void 0, void 0, function () {
        var resultOperacion, resultSuma_1, resultResta_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resultOperacion = 0;
                    if (!(operator === "suma")) return [3 /*break*/, 2];
                    console.log("Linea 4: Entr\u00F3 a " + operator);
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('./suma')); }).then(function (data) {
                            // console.log(data)
                            resultSuma_1 = new data.Suma(number1, number2).resultado();
                            // console.log(`Linea 10:El resultado de la suma es: ${resultSuma}`);
                            return resultOperacion = resultSuma_1;
                        })
                            .catch(function (e) { return e; })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(operator === "resta")) return [3 /*break*/, 4];
                    console.log("Linea 17: Entr\u00F3 a " + operator + " ");
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('./resta')); }).then(function (data) {
                            // console.log(data)
                            resultResta_1 = new data.Resta(number1, number2).resultado();
                            // console.log(`Linea 24: El resultado de la resta es: ${resultResta}`);
                            return resultOperacion = resultResta_1;
                        })
                            .catch(function (e) { return e; })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    console.log(operator);
                    if (operator !== "suma" || "resta") {
                        console.log("Linea 31: La operaci\u00F3n " + operator + " no existe.");
                    }
                    return [2 /*return*/, resultOperacion];
            }
        });
    });
}
var casosDePruebas = [
    { valorUno: 1, valorDos: 8, operacion: "suma" },
    { valorUno: 6, valorDos: 3, operacion: "resta" },
    { valorUno: 1, valorDos: 1, operacion: "suma" },
    { valorUno: 1, valorDos: 5, operacion: "resta" },
    { valorUno: 1, valorDos: 5, operacion: "nope" }
];
function operaciones(casos) {
    var _loop_1 = function (i) {
        operacion(casos[i].valorUno, casos[i].valorDos, casos[i].operacion)
            .then(function (data) { return console.log("Este es el resultado de la cuenta \uD83D\uDC49 " + casos[i].valorUno + " " + casos[i].operacion + " " + casos[i].valorDos + " = " + data); });
    };
    for (var i = 0; i < casos.length; i++) {
        _loop_1(i);
    }
}
operaciones(casosDePruebas);
