const g = globalThis as any;

if (!g.__SVD_MARKETPLACE__) {
  g.__SVD_MARKETPLACE__ = {
    templates: [
      {
        id: 'tpl-acc-starter',
        title: 'Accounting – Starter Vault',
        vertical: 'business',
        summary: 'Folders, labels, and intake links for a small firm.',
        version: '1.0.0',
        author: 'SecureVault Docs',
        tags: ['folders','labels','intake']
      },
      {
        id: 'tpl-biz-generic',
        title: 'Business – Essentials',
        vertical: 'business',
        summary: 'Requests, shares, and starter analytics.',
        version: '1.0.0',
        author: 'SecureVault Docs',
        tags: ['requests','shares']
      },
      {
        id: 'tpl-personal-life',
        title: 'Personal – Life Admin',
        vertical: 'personal',
        summary: 'IDs, bills, receipts, taxes; month-by-month folders.',
        version: '1.0.0',
        author: 'SecureVault Docs',
        tags: ['personal','bills','receipts']
      }
    ],
    installs: [] as any[]
  };
}

export const mockStore = g.__SVD_MARKETPLACE__ as {
  templates: Array<any>;
  installs: Array<any>;
};

export function isTestMode() {
  return process.env.NEXT_PUBLIC_SVD_MARKETPLACE_TEST_MODE === '1';
}

