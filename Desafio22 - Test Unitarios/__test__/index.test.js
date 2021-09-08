const { calculadora } =require('../index');

describe('Testing index! Happy Testing ♥', ()=>{

    it('Should return a false with array param', () => {
        const valueReturn = calculadora(1,[]);
        expect(valueReturn).toBe(false);
    })

    it('Should return a false with object param', () => {
        const valueReturn = calculadora(1,[]);
        expect(valueReturn).toBe(false);
    })

    it('Should return a false with string param', () => {
        const valueReturn = calculadora(1,"2");
        expect(valueReturn).toBe(false);
    })

    it('Should return a false with null param', () => {
        const valueReturn = calculadora(1,null);
        expect(valueReturn).toBe(false);
    })

    it('Should return a false with undefined param', () => {
        const valueReturn = calculadora(1,undefined);
        expect(valueReturn).toBe(false);
    })

    it('Should return an false with and empty param', () => {
        const valueReturn = calculadora(2);
        expect(valueReturn).toBe(false);
    })

    it('Should return an false with none param', () => {
        const valueReturn = calculadora();
        expect(valueReturn).toBe(false);
    })

    it('Should return an true with 3 or more param', () => {
        const valueReturn = calculadora(3,5,6);
        expect(valueReturn).toBe(true);
    })

    it('Should return an true with two integer numbers param', () => {
        const valueReturn = calculadora(1,2);
        expect(valueReturn).toBe(true);
    })

    it('Should return an true with two float numbers param', () => {
        const valueReturn = calculadora(1.3,2.5);
        expect(valueReturn).toBe(true);
    })

    it('Should return an true with a float number and an integer number param', () => {
        const valueReturn = calculadora(1.3,2.5);
        expect(valueReturn).toBe(true);
    })

    it('Should return an true with two negative numbers param', () => {
        const valueReturn = calculadora(-1,-5);
        expect(valueReturn).toBe(true);
    })

    it('Should return an true with one negative and one positive numbers param', () => {
        const valueReturn = calculadora(-1,5);
        expect(valueReturn).toBe(true);
    })

})