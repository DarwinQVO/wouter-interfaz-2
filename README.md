# Collaborative Note Cards

This is a small prototype for a collaborative Note Card platform. It uses React and Vite and stores data in the browser so it works completely offline.

## Development

With Node.js installed, run:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

The prototype lets you:

- Add new note cards
- Edit title, summary, date and content of each card
- Clone cards and move them to a trash section instead of deleting permanently
- Restore or permanently remove cards from the trash
- All changes are saved automatically in `localStorage` so refreshing the page keeps your work.
