(function () {
    try {
        const params = new URLSearchParams(window.location.search); // everything after the ?
        const key = params.get('key');
        const value = params.get('value');
		console.log('params:', params);
        if (key && value) {
            window.dataLayer = window.dataLayer || [];
            let data = {};
            data[key] = value;
            window.dataLayer.push(data);
            console.log('Pushed to dataLayer:', data);
        }
    } catch (err) {
        console.error('Error in URL param handling:', err);
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    try {
        const button = document.getElementById('sendRequest');

        if (!button) {
            console.warn('Button with ID "sendRequest" not found.');
            return;
        }

        button.addEventListener('click', function () {
            try {
                const dl = window.dataLayer || [];

                const customData = dl.find(entry =>
                    entry && typeof entry === 'object' && !entry.event
                );

                if (customData) {
                    const key = Object.keys(customData)[0];
                    const value = customData[key];
                    const url = `https://httpbin.org/get?${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

                    fetch(url)
                        .then(res => res.json())
                        .then(data => {
                            console.log('API response:', data);
                        })
                        .catch(err => {
                            console.error('Request failed:', err);
                        });
                } else {
                    console.warn('No key/value found in dataLayer');
                }
            } catch (err) {
                console.error('Error in button click handler:', err);
            }
        });
    } catch (err) {
        console.error('Error in DOMContentLoaded handler:', err);
    }
});

// Optional: Global error handlers
window.addEventListener('error', function (event) {
    console.error('Global script error:', event.error || event.message);
});

window.addEventListener('unhandledrejection', function (event) {
    console.error('Unhandled promise rejection:', event.reason);
});
