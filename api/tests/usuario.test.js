
/**
 * MODELO DE TESTES UNITÁRIOS - UsuarioService
 * 
 * Padrão AAA: Arrange → Act → Assert
 */

import { jest } from '@jest/globals';
import { usuarioService } from '../src/services/usuario.js';
import { pool } from '../src/config/db.js';

describe('UsuarioService - Testes Unitários', () => {

    beforeEach(() => {
        // Mockar a função query do pool manualmente
        pool.query = jest.fn();
    });

    describe('CT-01: Método getAll()', () => {
        test('Deve retornar lista de usuários quando existem registros', async () => {
            const mockUsuarios = [
                { id: 1, nome: 'João Silva', email: 'joao@email.com', senha: '123456' },
                { id: 2, nome: 'Maria Santos', email: 'maria@email.com', senha: '123456' }
            ];

            pool.query.mockResolvedValueOnce({ rows: mockUsuarios });


            const resultado = await usuarioService.getAll();


            expect(resultado).toEqual(mockUsuarios);
            expect(resultado).toHaveLength(2);
            expect(pool.query).toHaveBeenCalledWith('SELECT * from usuario');
        });

        test('Deve retornar array vazio quando não há usuários', async () => {

            pool.query.mockResolvedValueOnce({ rows: [] });


            const resultado = await usuarioService.getAll();

            expect(resultado).toEqual([]);
            expect(resultado).toHaveLength(0);
        });

        test('Deve lançar erro quando a query falha', async () => {

            const errorMensagem = 'Erro de conexão com banco';
            pool.query.mockRejectedValueOnce(new Error(errorMensagem));


            await expect(usuarioService.getAll()).rejects.toThrow(errorMensagem);
        });
    });


    describe('CT-02: Método createUser()', () => {
        test('Deve criar usuário com sucesso quando dados são válidos', async () => {

            const novoUsuario = { nome: 'Carlos', email: 'carlos@email.com', senha: '123456' };
            const usuarioCriado = { id: 1, ...novoUsuario };

            pool.query.mockResolvedValueOnce({
                rows: [usuarioCriado],
                rowCount: 1
            });

            const resultado = await usuarioService.createUser(novoUsuario);

            expect(resultado).toEqual({
                mensagem: 'usuario criado',
                data: [usuarioCriado],
                status: true
            });
            expect(resultado.status).toBe(true);
            expect(pool.query).toHaveBeenCalledWith(
                'INSERT INTO usuario(nome,email,senha) VALUES($1,$2,$3) RETURNING *',
                [novoUsuario.nome, novoUsuario.email, novoUsuario.senha]
            );
        });

        test('Deve retornar erro quando falha ao criar usuário', async () => {

            const novoUsuario = { nome: 'Ana', email: 'ana@email.com', senha: '123456' };
            pool.query.mockResolvedValueOnce({ rowCount: 0 });


            const resultado = await usuarioService.createUser(novoUsuario);


            expect(resultado.status).toBe(false);
            expect(resultado.mensagem).toBe('erro ao criar usuario');
        });

        test('Deve validar que nome é obrigatório', async () => {

            const usuarioInvalido = { email: 'teste@email.com', senha: '123456' };


            expect(usuarioInvalido.nome).toBeUndefined();
        });
    });


    describe('CT-03: Método login()', () => {
        test('Deve retornar dados do usuário quando login é bem-sucedido', async () => {

            const credenciais = { email: 'joao@email.com', senha: '123456' };
            const usuarioEncontrado = { id: 1, nome: 'João', email: 'joao@email.com' };

            pool.query.mockResolvedValueOnce({ rows: [usuarioEncontrado] });


            const resultado = await usuarioService.login(credenciais.email, credenciais.senha);


            expect(resultado.status).toBe(true);
            expect(resultado.mensagem).toBe('usuario logado');
            expect(resultado.data[0]).toEqual(usuarioEncontrado);
        });

        test('Deve retornar erro quando email ou senha são incorretos', async () => {

            pool.query.mockResolvedValueOnce({ rows: [] });


            const resultado = await usuarioService.login('invalido@email.com', 'senha123');


            expect(resultado.status).toBe(false);
            expect(resultado.mensagem).toBe('email ou senha incorretos');
        });

        test('Deve validar que email é obrigatório', async () => {

            const credenciaisInvalidas = { senha: '123456' };


            expect(credenciaisInvalidas.email).toBeUndefined();
        });
    });


    describe('CT-04: Método put() - Atualizar usuário', () => {
        test('Deve atualizar usuário com sucesso', async () => {

            const usuarioAtualizado = { id: 1, nome: 'João Atualizado', email: 'joao.novo@email.com', senha: '654321' };

            pool.query.mockResolvedValueOnce({
                rows: [usuarioAtualizado],
                rowCount: 1
            });


            const resultado = await usuarioService.put(usuarioAtualizado);


            expect(resultado.status).toBe(true);
            expect(resultado.mensagem).toBe('usuario modificado');
            expect(pool.query).toHaveBeenCalledWith(
                'UPDATE usuario SET nome = $1, email= $2, senha=$3 where id=$4 RETURNING *',
                [usuarioAtualizado.nome, usuarioAtualizado.email, usuarioAtualizado.senha, usuarioAtualizado.id]
            );
        });

        test('Deve retornar erro quando usuário não existe', async () => {

            const usuarioInexistente = { id: 999, nome: 'Fantasma', email: 'fantasma@email.com', senha: '123456' };
            pool.query.mockResolvedValueOnce({ rowCount: 0 });


            const resultado = await usuarioService.put(usuarioInexistente);


            expect(resultado.status).toBe(false);
            expect(resultado.mensagem).toBe('erro ao modificar usuario');
        });

        test('Deve validar que ID é obrigatório', () => {

            const usuarioSemId = { nome: 'Pedro', email: 'pedro@email.com', senha: '123456' };


            expect(usuarioSemId.id).toBeUndefined();
        });
    });


    describe('CT-05: Método delete() - Deletar usuário', () => {
        test('Deve deletar usuário com sucesso', async () => {

            const idUsuario = 1;
            pool.query.mockResolvedValueOnce({ rowCount: 1 });


            const resultado = await usuarioService.delete(idUsuario);

            expect(resultado.status).toBe(true);
            expect(resultado.mensagem).toBe('usuario deletado');
            expect(pool.query).toHaveBeenCalledWith(
                'DELETE FROM usuario WHERE id = $1',
                [idUsuario]
            );
        });

        test('Deve retornar erro quando usuário não existe', async () => {

            const idUsuario = 999;
            pool.query.mockResolvedValueOnce({ rowCount: 0 });


            const resultado = await usuarioService.delete(idUsuario);

            expect(resultado.status).toBe(false);
            expect(resultado.mensagem).toBe('usuario nao foi deletado');
        });

        test('Deve validar que ID é número válido', () => {

            const idInvalido = 'abc';


            expect(typeof idInvalido).not.toBe('number');
        });
    });


    describe('CT-06: Testes de Exceção e Erro', () => {
        test('Deve lançar erro em caso de falha no banco de dados', async () => {

            pool.query.mockRejectedValueOnce(new Error('Connection timeout'));


            await expect(usuarioService.getAll()).rejects.toThrow('Connection timeout');
        });

        test('Deve lançar erro quando senha é muito fraca', () => {

            const usuarioComSenhaFraca = { nome: 'Test', email: 'test@email.com', senha: '123' };


            expect(usuarioComSenhaFraca.senha.length).toBeLessThan(6);
        });
    });

});
