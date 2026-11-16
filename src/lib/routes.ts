export type PageKind = 'home' | 'service' | 'area';

export function sectionHref(hash: string, onHome: boolean): string {
  return onHome ? hash : `/${hash}`;
}

export function isPageKind(value: string | undefined): value is PageKind {
  return value === 'home' || value === 'service' || value === 'area';
}

export function readPage(): { page: PageKind; slug: string } {
  const page = document.body.dataset.page;
  return {
    page: isPageKind(page) ? page : 'home',
    slug: document.body.dataset.slug ?? '',
  };
}
