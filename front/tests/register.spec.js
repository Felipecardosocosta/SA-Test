import { test, expect } from '@playwright/test';

test.describe('Cadastro de Usuário', () => {
  test.beforeEach(async ({ page }) => {

    await page.goto('/');
  });

  test('deve cadastrar um novo usuário com sucesso', async ({ page }) => {

    await page.getByRole('button', { name: 'Criar Conta' }).click();



    const cadastroForm =page.locator('div').filter({ has: page.getByRole('heading', { name: 'Criar Usuário', level: 2 }) }).last();

    await cadastroForm.getByLabel('Nome:').fill('Usuário de Teste');

    const uniqueEmail = `teste${Date.now()}@exemplo.com`;
    await cadastroForm.getByLabel('Email:').fill(uniqueEmail);

    await cadastroForm.getByLabel('Senha:', { exact: true }).fill('senha123456');
    await cadastroForm.getByLabel('Confirme Senha:').fill('senha123456');

    await cadastroForm.getByRole('button', { name: 'Criar Usuario' }).click();


    await expect(page.getByText('Usuario Criado com Sucesso')).toBeVisible();


    await expect(page.getByRole('heading', { name: 'Criar Usuário' })).not.toBeVisible();
  });

  test('deve mostrar erro quando as senhas não coincidem', async ({ page }) => {

    await page.getByRole('button', { name: 'Criar Conta' }).click();


    await page.getByLabel('Senha:', { exact: true }).fill('senha123456');
    await page.getByLabel('Confirme Senha:').fill('senhaDiferente');


    await page.getByRole('button', { name: 'Criar Usuario' }).click();


    await expect(page.getByText('As senhas não correspondem')).toBeVisible();
  });

  test('deve validar campos obrigatórios via HTML5', async ({ page }) => {
    await page.getByRole('button', { name: 'Criar Conta' }).click();


    await page.getByRole('button', { name: 'Criar Usuario' }).click();

    await expect(page.getByRole('heading', { name: 'Criar Usuário' })).toBeVisible();
  });
});
