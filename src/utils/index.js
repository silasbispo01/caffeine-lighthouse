const domainRegx = /[www]|(\.com)|(\.com\.\w*\/)/;

function toS(ms, length = 1) {
  return (ms / 1000).toFixed(length);
}

function getDomain(url) {
  let domain;
  url.split('/').forEach((piece) => {
    if(piece.match(domainRegx)) return domain = piece;
  });
  return domain;
}

function getPage(url) {
  let idx, page;
  let pageArr = [];
  let arr = url.split('/');

  arr.forEach((piece, i) => {
    if(piece.match(domainRegx)) idx = i;
  })

  arr.forEach((piece, i) => {
    if(i > idx) return pageArr.push(piece)
  })

  page = pageArr.join('/');

  console.log(page)
  console.log(idx)
  return page;
}

export { toS, getDomain, getPage }