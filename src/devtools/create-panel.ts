if (window.location.hash !== '#panel') {
  chrome.devtools.panels.create('Console Cat', '', 'devtools.html#panel')
}
