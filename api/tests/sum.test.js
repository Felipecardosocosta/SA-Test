// Teste simples de exemplo
test('Somar 2 + 2 deve resultar em 4', () => {
     expect(2 + 2).toBe(4);
});

test('Somar 1 + 1 deve resultar em 2', () => {
     expect(1 + 1).toBe(2);
});

test('Validar tipo de número', () => {
     const resultado = 10;
     expect(typeof resultado).toBe('number');
});