function updateUI() {
    chrome.storage.local.get(['foundCount'], function (result) {
        document.getElementById('foundCount').textContent = result.foundCount || 0;
    });
}

updateUI();

chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === 'local' && changes.foundCount) {
        updateUI();
    }
});