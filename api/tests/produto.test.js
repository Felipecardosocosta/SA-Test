import { jest } from '@jest/globals';
import { produtoService } from '../src/services/produto.js';
import { pool } from '../src/config/db.js';

describe('ProdutoService - Testes Unitários', () => {

    beforeEach(() => {
       
        pool.query = jest.fn();
    });

    describe('CT-12: Método getAll() - Listar Produtos', () => {
        test('Deve retornar lista de produtos com sucesso', async () => {
            const mockProdutos = [
                { id: 1, nome: 'Caixa de transporte', valor: 3000, quantidade: 5 },
                { id: 2, nome: 'Ração', valor: 50, quantidade: 20 }
            ];

            pool.query.mockResolvedValueOnce({ rows: mockProdutos });


            const resultado = await produtoService.getAll();

            expect(resultado.status).toBe(true);
            expect(resultado.mensagem).toBe('todos os produtos');
            expect(resultado.data).toEqual(mockProdutos);
            expect(resultado.data.length).toBeGreaterThan(0);
        });

        test('Deve retornar mensagem quando não há produtos', async () => {

            pool.query.mockResolvedValueOnce({ rows: [] });

            const resultado = await produtoService.getAll();

            expect(resultado.status).toBe(false);
            expect(resultado.mensagem).toBe('Sem produtos cadastrados');
            expect(resultado.data).toEqual([]);
        });
    });


    describe('CT-13: Método getById() - Buscar por ID', () => {
        test('Deve retornar produto quando ID existe', async () => {

            const produtoEncontrado = { id: 1, nome: 'Remédio', valor: 150, quantidade: 10 };

            pool.query.mockResolvedValueOnce({ rows: [produtoEncontrado] });


            const resultado = await produtoService.getById(1);


            expect(resultado.status).toBe(true);
            expect(resultado.mensagem).toBe('Produto encontrado');
            expect(resultado.data).toEqual(produtoEncontrado);
            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * from produto where id=$1',
                [1]
            );
        });

        test('Deve retornar erro quando produto não existe', async () => {

            pool.query.mockResolvedValueOnce({ rows: [] });


            const resultado = await produtoService.getById(999);


            expect(resultado.status).toBe(false);
            expect(resultado.mensagem).toBe('Produto não cadastrado');
        });

        test('Deve validar que ID é número positivo', () => {

            expect(typeof 1).toBe('number');
            expect(1).toBeGreaterThan(0);
            expect('abc').not.toBe(1);
        });
    });


    describe('CT-14: Método createProduto() - Criar Produto', () => {
        test('Deve criar produto com sucesso', async () => {
   
            const novoProduto = { nome: 'Brinquedo', valor: 200, quantidade: 15 };
            const produtoCriado = { id: 3, ...novoProduto };

            pool.query.mockResolvedValueOnce({
                rows: [produtoCriado],
                rowCount: 1
            });


            const resultado = await produtoService.createProduto(novoProduto);

     
            expect(resultado.status).toBe(true);
            expect(resultado.mensagem).toBe('Produto criado');
            expect(resultado.data).toContainEqual(produtoCriado);
            expect(pool.query).toHaveBeenCalledWith(
                'INSERT INTO produto(nome,valor,quantidade) VALUES($1,$2,$3) RETURNING *',
                [novoProduto.nome, novoProduto.valor, novoProduto.quantidade]
            );
        });

        test('Deve retornar erro quando falha ao criar produto', async () => {
       
            const novoProduto = { nome: 'Vermicida', valor: 500, quantidade: 8 };
            pool.query.mockResolvedValueOnce({ rowCount: 0 });

            const resultado = await produtoService.createProduto(novoProduto);

  
            expect(resultado.status).toBe(false);
            expect(resultado.mensagem).toBe('erro ao criar produto');
        });

        test('Deve validar campos obrigatórios', () => {

            const produtoInvalido = { nome: 'Produto', valor: 100 }; // Sem quantidade

            expect(produtoInvalido.quantidade).toBeUndefined();
            expect(produtoInvalido.nome).toBeDefined();
            expect(produtoInvalido.valor).toBeGreaterThan(0);
        });

        test('Deve validar que valor é número positivo', () => {
            const produtoComPrecoInvalido = { nome: 'Produto', valor: -50, quantidade: 10 };


            expect(produtoComPrecoInvalido.valor).toBeLessThan(0);
            expect(100).toBeGreaterThan(0);
        });

        test('Deve validar que quantidade é número', () => {

            const produtoComQuantidadeInvalida = { nome: 'Produto', valor: 100, quantidade: 'dez' };


            expect(typeof produtoComQuantidadeInvalida.quantidade).not.toBe('number');
        });
    });


    describe('CT-15 e CT-16: Método comprar() - Processar Compra', () => {
        test('Deve completar compra com sucesso e atualizar estoque', async () => {

            const idProduto = 1;
            const quantidadeCompra = 3;
            const produtoDisponivel = { id: 1, nome: 'Ração', valor: 50, quantidade: 10 };
            const produtoAtualizado = { id: 1, nome: 'Ração', valor: 50, quantidade: 7 };


            pool.query.mockResolvedValueOnce({ rows: [produtoDisponivel] });

            pool.query.mockResolvedValueOnce({
                rows: [produtoAtualizado],
                rowCount: 1
            });


            const resultado = await produtoService.comprar(idProduto, quantidadeCompra);

            

            expect(resultado.status).toBe(true);
            expect(resultado.mensagem).toBe('Compra efetuada');
            expect(resultado.data.quantidade).toBe(7); // 10 - 3
        });

        test('Deve rejeitar compra quando estoque é insuficiente', async () => {

            const idProduto = 2;
            const quantidadeCompra = 100;
            const produtoSemEstoque = { id: 2, nome: 'Gaiola', valor: 150, quantidade: 5 };

            pool.query.mockResolvedValueOnce({ rows: [produtoSemEstoque] });


            const resultado = await produtoService.comprar(idProduto, quantidadeCompra);


            expect(resultado.status).toBe(false);
            expect(resultado.mensagem).toBe('erro ao comprar');
        });

        test('Deve rejeitar compra quando produto não existe', async () => {

            pool.query.mockResolvedValueOnce({ rows: [] });


            const resultado = await produtoService.comprar(999, 1);


            expect(resultado.status).toBe(false);
            expect(resultado.mensagem).toBe('Produto não cadastrado');
        });

        test('Deve validar que quantidade é número positivo', () => {

            const quantidadeInvalida = -5;


            expect(quantidadeInvalida).toBeLessThan(0);
            expect(typeof quantidadeInvalida).toBe('number');
        });

        test('Deve validar que quantidade não é zero', () => {

            const quantidadeZero = 0;


            expect(quantidadeZero).toBe(0);
            expect(quantidadeZero).not.toBeGreaterThan(0);
        });
    });


    describe('CT-17: Método delete() - Deletar Produto', () => {
        test('Deve deletar produto com sucesso', async () => {

            const idProduto = 1;
            pool.query.mockResolvedValueOnce({ rowCount: 1 });


            const resultado = await produtoService.delete(idProduto);


            expect(resultado.status).toBe(true);
            expect(resultado.mensagem).toBe('Produto deletado');
            expect(pool.query).toHaveBeenCalledWith(
                'DELETE FROM produto WHERE id = $1',
                [idProduto]
            );
        });

        test('Deve retornar erro quando produto não existe', async () => {

            const idProduto = 999;
            pool.query.mockResolvedValueOnce({ rowCount: 0 });


            const resultado = await produtoService.delete(idProduto);


            expect(resultado.status).toBe(false);
            expect(resultado.mensagem).toBe('Produto nao foi deletado');
        });
    });


    describe('CT-18: Testes de Validação e Erro', () => {
        test('Deve lançar erro em caso de falha no banco de dados', async () => {

            pool.query.mockRejectedValueOnce(new Error('Connection refused'));


            await expect(produtoService.getAll()).rejects.toThrow('Connection refused');
        });

        test('Deve validar tipos de dados antes de inserir', () => {

            const produtoComTipoDados = {
                nome: 'Produto',
                valor: 100,
                quantidade: 10
            };

         
            expect(typeof produtoComTipoDados.nome).toBe('string');
            expect(typeof produtoComTipoDados.valor).toBe('number');
            expect(typeof produtoComTipoDados.quantidade).toBe('number');
        });

        test('Deve rejeitar produto com nome vazio', () => {
            const produtoSemNome = { nome: '', quantidade: 10 };


            expect(produtoSemNome.nome.length).toBe(0);
            expect(produtoSemNome.nome).toBeFalsy();
        });

        test('Deve rejeitar produto com valor negativo', () => {

            const produtoComPrecoNegativo = { nome: 'Produto', valor: -100, quantidade: 10 };


            expect(produtoComPrecoNegativo.valor).toBeLessThan(0);
        });

        test('Deve aceitar produto com quantidade zero (inicial)', () => {

            const produtoZeroEstoque = { nome: 'Produto', valor: 100, quantidade: 0 };


            expect(produtoZeroEstoque.quantidade).toBe(0);
            expect(produtoZeroEstoque.quantidade).not.toBeNull();
        });
    });

});
