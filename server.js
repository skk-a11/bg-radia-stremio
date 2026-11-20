'use strict';
const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const stations = require('./stations.json');
const manifest = {
  id: 'bg.radia.lola.community', version: '1.0.0',
  name: 'БГ Радиа + LOLA',
  description: 'Любими български радиа, Radio LOLA и LOLA TV. Някои стриймове очакват потвърждение.',
  resources: ['catalog', 'meta', 'stream'], types: ['tv'],
  idPrefixes: ['bgradia:'],
  catalogs: [
    { type: 'tv', id: 'bg-radio', name: 'БГ Радиа • Радио' },
    { type: 'tv', id: 'bg-tv', name: 'БГ Радиа • Телевизия' }
  ]
};
const builder = new addonBuilder(manifest);
const byId = id => stations.find(s => `bgradia:${s.id}` === id);
const meta = s => ({ id: `bgradia:${s.id}`, type: 'tv', name: s.name,
  description: s.url ? 'Онлайн излъчване — адресът не е тестван на Android TV.' : 'Очаква потвърден директен стрийм адрес.',
  poster: `https://placehold.co/300x450/17233b/ffffff.png?text=${encodeURIComponent(s.name)}`,
  posterShape: 'poster' });
builder.defineCatalogHandler(({ type, id }) => Promise.resolve({
  metas: type === 'tv' ? stations.filter(s => (id === 'bg-radio' && s.group === 'radio') || (id === 'bg-tv' && s.group === 'tv')).map(meta) : []
}));
builder.defineMetaHandler(({ id }) => Promise.resolve({ meta: byId(id) ? meta(byId(id)) : null }));
builder.defineStreamHandler(({ id }) => {
  const station = byId(id);
  return Promise.resolve({ streams: station && station.url ? [{ title: station.name, url: station.url }] : [] });
});
serveHTTP(builder.getInterface(), { port: Number(process.env.PORT || 7000) });
