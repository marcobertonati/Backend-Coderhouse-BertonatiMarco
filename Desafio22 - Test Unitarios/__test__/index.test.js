const { calculadora } =require('../index');

describe('All cases have a correct "operator" param! Happy Testing ♥.', ()=>{

    it('Should return a false with array param', () => {
        const valueReturn = calculadora(1,"+",[]);
        expect(valueReturn).toBe(false);
    })

    it('Should return a false with object param', () => {
        const valueReturn = calculadora(1,"-",[]);
        expect(valueReturn).toBe(false);
    })

    it('Should return a false with string param', () => {
        const valueReturn = calculadora(1,"+","2");
        expect(valueReturn).toBe(false);
    })

    it('Should return a false with null param', () => {
        const valueReturn = calculadora(1,"+",null);
        expect(valueReturn).toBe(false);
    })

    it('Should return a false with undefined param', () => {
        const valueReturn = calculadora(1,"+",undefined);
        expect(valueReturn).toBe(false);
    })

    it('Should return an false with and empty param', () => {
        const valueReturn = calculadora(2,"+");
        expect(valueReturn).toBe(false);
    })

    it('Should return an false with none param', () => {
        const valueReturn = calculadora();
        expect(valueReturn).toBe(false);
    })

    it('Should return an 9 with 4 or more param', () => {
        const valueReturn = calculadora(3,"+",6,6);
        expect(valueReturn).toBe(9);
    })

    it('Should return a 3 with two integer numbers param', () => {
        const valueReturn = calculadora(1,"+",2);
        expect(valueReturn).toBe(3);
    })

    it('Should return a 3.7 with two float numbers param', () => {
        const valueReturn = calculadora(1.3,"+",2.5);
        expect(valueReturn).toBe(3.8);
    })

    it('Should return a 3.3 with a float number and an integer number param', () => {
        const valueReturn = calculadora(1.3,"+",2);
        expect(valueReturn).toBe(3.3);
    })

    it('Should return a -6 with two negative numbers param', () => {
        const valueReturn = calculadora(-1,"+",-5);
        expect(valueReturn).toBe(-6);
    })

    it('Should return a 4 true with one negative and one positive numbers param', () => {
        const valueReturn = calculadora(-1,"+",5);
        expect(valueReturn).toBe(4);
    })

})

/*---------------------*/
describe('All cases have an incorrect "operator" param! Happy Testing ♥.', ()=>{

    it('Should return a false with string that is not + - / or *', () => {
        const valueReturn = calculadora(1,"a",2);
        expect(valueReturn).toBe(false);
    })

    it('Should return a false with null param', () => {
        const valueReturn = calculadora(1,null,2);
        expect(valueReturn).toBe(false);
    })

    it('Should return a false with undefined param', () => {
        const valueReturn = calculadora(1,undefined,2);
        expect(valueReturn).toBe(false);
    })

    it('Should return a false with NaN param', () => {
        const valueReturn = calculadora(1,NaN,2);
        expect(valueReturn).toBe(false);
    })

    it('Should return a false with an number', () => {
        const valueReturn = calculadora(1,3,2);
        expect(valueReturn).toBe(false);
    })

})