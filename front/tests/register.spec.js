import { test, expect } from '@playwright/test';

test.describe('Cadastro de Usuário', () => {
  test.beforeEach(async ({ page }) => {

    await page.goto('/');
  });

  test('deve cadastrar um novo usuário com sucesso', async ({ page }) => {
 
    await page.getByRole('button', { name: 'Criar Conta' }).click();

 
    await page.getByLabel('Nome:').fill('Usuário de Teste');
    
    const uniqueEmail = `teste${Date.now()}@exemplo.com`;
    await page.getByLabel('Email:').fill(uniqueEmail);
    
    await page.getByLabel('Senha:', { exact: true }).fill('senha123456');
    await page.getByLabel('Confirme Senha:').fill('senha123456');

   
    await page.getByRole('button', { name: 'Criar Usuario' }).click();

    
    await expect(page.getByText('Usuaro Criado com Sucesso')).toBeVisible();
    

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
