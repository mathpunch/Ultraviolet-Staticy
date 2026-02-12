const form = document.getElementById('uv-form');
const address = document.getElementById('uv-address');

form.addEventListener('submit', async event => {
    event.preventDefault();
    console.log("Search submitted...");

    // This registers the Service Worker properly for Vercel
    try {
        await registerSW();
    } catch (err) {
        alert("Failed to register Service Worker. Check your console.");
        console.error(err);
        return;
    }

    let url = address.value.trim();
    if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
    else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;

    // Redirect to the proxy
    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});

async function registerSW() {
    if ('serviceWorker' in navigator) {
        return navigator.serviceWorker.register('./uv/uv.sw.js', {
            scope: __uv$config.prefix
        });
    } else {
        throw new Error("Your browser does not support Service Workers.");
    }
}

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || (val.includes('.') && val.substr(0, 1) !== ' ')) return true;
    return false;
};
