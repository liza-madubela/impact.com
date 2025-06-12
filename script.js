// Push query parameters into dataLayer
(function() {
    const params = new URLSearchParams(window.location.search);
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
})();

// Add click handler to the button
document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('sendRequest');

    button.addEventListener('click', function() {
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
    });
});
