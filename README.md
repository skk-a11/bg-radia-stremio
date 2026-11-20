# БГ Радиа + LOLA — Stremio

Stremio addon with two catalogs: Bulgarian radio and LOLA TV.

## Deploy to Render

1. Upload the four files in this directory to the ROOT of the GitHub repository (do not upload the ZIP itself).
2. In Render: New → Web Service → Connect the GitHub repository.
3. Runtime: Node; Build Command: `npm install`; Start Command: `npm start`.
4. Select a suitable available plan and deploy.
5. Open `https://YOUR-RENDER-URL/manifest.json` to verify that JSON appears.
6. In Stremio, install the addon using the HTTPS manifest URL in the addons interface.

## Important

The 14 Bulgarian stations are catalog entries only, with empty `url` fields in `stations.json`. They WILL NOT play until working, legally accessible direct audio stream URLs are added. The Radio LOLA and LOLA TV URLs were provided earlier but have not been tested on Android TV and may change or fail. A free hosting plan may sleep between requests.

Do not upload passwords or API keys. The repository is public.
