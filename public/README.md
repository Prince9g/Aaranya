# Public Assets

Place static files here (served at the site root). For images, prefer placing them under `public/images/`.

Usage examples in React (Vite):

- Direct `img` tag:

```tsx
<img src="/images/hero.jpg" alt="Hero" />
```

- CSS background (Tailwind inline style example):

```tsx
<div style={{ backgroundImage: 'url(/images/bg-pattern.png)' }} />
```

Notes:
- Files in `public/` are copied as-is and served from the root (`/`).
- Do not import these with `import` statements; reference via path starting with `/`.
- Keep large assets optimized (compressed) for faster loads. 