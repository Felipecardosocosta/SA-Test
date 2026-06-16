import { test, expect } from '@playwright/test';

test.describe('Login de Usuário', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve realizar login com sucesso', async ({ page }) => {

    await page.getByLabel('Email:').fill('joao@email.com');
    await page.getByLabel('Senha:', { exact: true }).fill('a12345678');

    await page.getByRole('button', { name: 'Entrar' }).click();

   
    await expect(page.getByText('Login realizado com sucesso!')).toBeVisible();

    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });
  });

  test('deve mostrar erro com credenciais inválidas', async ({ page }) => {
    await page.getByLabel('Email:').fill('email@naoexiste.com');
    await page.getByLabel('Senha:', { exact: true }).fill('senhaIncorreta');

    await page.getByRole('button', { name: 'Entrar' }).click();

    
    await expect(page.getByText(/Usuario não encontrado|Erro interno no servidor/)).toBeVisible();
  });
});
