import { test, expect } from '@playwright/test';

test('Thêm 2 sản phẩm vào giỏ và thanh toán thành công', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);

  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');

  await page.getByTestId('shopping-cart-link').click();
  await expect(page).toHaveURL(/cart\.html/);
  await page.getByTestId('checkout').click();

  await page.getByTestId('firstName').fill('Phat');
  await page.getByTestId('lastName').fill('Huynh');
  await page.getByTestId('postalCode').fill('70000');
  await page.getByTestId('continue').click();
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  await page.getByTestId('finish').click();
  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
});
