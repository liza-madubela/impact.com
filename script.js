(function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const key = urlParams.get('key');
        const value = urlParams.get('value');
		console.log('params:', urlParams.values);
        if (key && value) {
            window.dataLayer = window.dataLayer || [];
            let data = {};
            data[key] = value;
			console.log('pushing the key and value to the GTM data layer ...')
            window.dataLayer.push(data);
            console.log('data pushed to the dataLayer:', data);
        }
    } catch (error) {
        console.error('Error wheile trying to push the data to the GTM data layer:', error);
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
                const dataLayer = window.dataLayer || [];

                const customData = dataLayer.find(entry =>
                    entry && typeof entry === 'object' && !entry.event
                );

                if (customData) {
                    const key = Object.keys(customData)[0];
                    const value = customData[key];
                    const url = `https://httpbin.org/get?${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
					console.log('calling the httpbin API ', url);
                    fetch(url)
                        .then(res => res.json())
                        .then(data => {
                            console.log('GET response:', data);
                        })
                        .catch(error => {
                            console.error('Request failed:', error);
                        });
                } else {
                    console.warn('No key/value found in dataLayer');
                }
            } catch (error) {
                console.error('Error in button click handler:', error);
            }
        });
    } catch (error) {
        console.error('Error in DOMContentLoaded handler:', error);
    }
});

// Optional: Global error handlers
window.addEventListener('error', function (event) {
    console.error('Global script error:', event.error || event.message);
});

window.addEventListener('unhandledrejection', function (event) {
    console.error('Unhandled promise rejection:', event.reason);
});
