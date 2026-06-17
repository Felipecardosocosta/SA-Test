import { test, expect } from '@playwright/test';

test.describe('Gerenciamento de Produtos (CRUD)', () => {
  test.beforeEach(async ({ page }) => {

    await page.goto('/');
    await page.getByLabel('Email:').fill('joao@email.com');
    await page.getByLabel('Senha:', { exact: true }).fill('a12345678');
    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('deve cadastrar um novo produto e visualizá-lo na lista', async ({ page }) => {

    await page.getByRole('link', { name: 'Produtos' }).click();


    await expect(page).toHaveURL(/.*produtos/);

    const produtoNome = `Produto Teste ${Date.now()}`;


    await page.getByLabel('Nome do Produto:').fill(produtoNome);
    await page.getByLabel('Valor (R$):').fill('25.50');
    await page.getByLabel('Quantidade:').fill('10');

    await page.getByRole('button', { name: 'Adicionar Produto' }).click();


    await expect(page.getByText('Produto adicionado com sucesso!')).toBeVisible();


    await page.goto('/dashboard');
    await page.getByPlaceholder('Digite o nome, valor ou quantidade').fill(produtoNome);
    await expect(page.getByText(produtoNome)).toBeVisible();
  });

  test('deve realizar a "compra" de um produto ', async ({ page }) => {



    await page.getByRole('link', { name: 'Comprar' }).click();


    await expect(page).toHaveURL(/.*compra/);


    const rachaolabel = page.locator('label').filter({ hasText: 'Ração' }).first();
    await rachaolabel.click();

    await page.getByLabel('Quantidade a Comprar:').fill('1');


    await page.getByRole('button', { name: 'Realizar Compra' }).click();


    await expect(page.getByText(/Compra realizada com sucesso!/)).toBeVisible();
  });

  test('deve deletar um produto com sucesso', async ({ page }) => {

   

    await expect(page).toHaveURL(/.*dashboard/);

    await page.getByPlaceholder('Digite o nome, valor ou quantidade').fill('Ração');


    await page.getByRole('link', { name: 'Ver detalhes' }).first().click();


    await page.getByRole('button', { name: 'Deletar' }).click();


    await expect(page.getByText('Produto deletado com sucesso')).toBeVisible();


    await expect(page).toHaveURL(/.*dashboard/);
    await page.getByPlaceholder('Digite o nome, valor ou quantidade').fill('Ração');
    await expect(page.getByText('Nenum produto encontrado')).toBeVisible();
  });
});
