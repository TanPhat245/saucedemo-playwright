import { test, expect } from '@playwright/test';

test('Đăng nhập thất bại với locked_out_user hiển thị thông báo tài khoản bị khóa', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill('locked_out_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('error')).toBeVisible();
  await expect(page.getByTestId('error')).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
  );
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
