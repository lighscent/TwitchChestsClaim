(function () {
    const selector = 'button.ScCoreButton-sc-s7h2b7-0.kaIUar';
    
    chrome.storage.local.get(['foundCount'], function (result) {
        if (typeof result.foundCount !== 'number') {
            chrome.storage.local.set({ foundCount: 0 });
        }
    });

    function querySelectorDeep(selector, root = document) {
        let el = root.querySelector(selector);
        if (el) return el;
        const children = root.querySelectorAll('*');
        for (const child of children) {
            if (child.shadowRoot) {
                el = querySelectorDeep(selector, child.shadowRoot);
                if (el) return el;
            }
        }
        return null;
    }

    function updateCounter(key, increment) {
        chrome.storage.local.get([key], function (result) {
            let value = result[key] || 0;
            value += increment;
            let update = {};
            update[key] = value;
            chrome.storage.local.set(update);
        });
    }

    function checkAndClick() {
        const button = querySelectorDeep(selector);
        if (button) {
            updateCounter('foundCount', 1);
            button.click();
        }
    }

    checkAndClick();

    setInterval(checkAndClick, 5000);
})();
