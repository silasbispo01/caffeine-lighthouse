const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const baseURL = 'https://'

const lighthouseBenchmark = {
  run: async (website) => {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {output: 'json', port: chrome.port};

    const { lhr: response } = await lighthouse(`${baseURL + website}`, options);
    await chrome.kill();

    if(response.runWarnings.length >= 1) {
      throw new Error(JSON.stringify(response.runWarnings))
    }

    return response;
  },
  run: (data) => {
    return 
  }
}

export { lighthouseBenchmark }; 



try {
  let response = await lh.get(website)
    
  let { firstContentfulPaint, speedIndex, largestContentfulPaint, totalBlockingTime, interactive, cumulativeLayoutShift} = response.audits.metrics.details.items[0];
  let { accessibility, 'best-practices': bestPractices , performance, pwa, seo } = response.categories; 
    
  let websiteMetrics = {
    domain: getDomain(response.finalUrl),
    page: getPage(response.finalUrl),
    fetchTime: response.fetchTime,
    categoriesScore: {
      accessibility: (accessibility.score * 100).toFixed(1),
      bestPractices: (bestPractices.score * 100).toFixed(1),
      performance: (performance.score * 100).toFixed(1),
      pwa: (pwa.score * 100).toFixed(1),
      seo: (seo.score * 100).toFixed(1) 
    },
    metrics: {
      firstContentfulPaint: toS(firstContentfulPaint) + 's',
      speedIndex: toS(speedIndex) + 's',
      largestContentfulPaint: toS(largestContentfulPaint) + 's',
      totalBlockingTime: Math.round(totalBlockingTime) + 'ms',
      interactive: toS(interactive) + 's',
      cumulativeLayoutShift: cumulativeLayoutShift.toFixed(3),
    }
  }
  
  res.json(websiteMetrics);
} catch (err){
  res.json({ errors: JSON.parse(err.message)});
}