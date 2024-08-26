document.addEventListener('DOMContentLoaded', function() {
    // Initialize collapsible sections
    initializeCollapsibleSections();

    // Function to initialize collapsible sections
    function initializeCollapsibleSections() {
        const sections = document.querySelectorAll('.dashboard-section');

        sections.forEach(section => {
            section.addEventListener('click', function() {
                const content = this.querySelector('.content');
                
                // Check if the section is already active
                if (this.classList.contains('active')) {
                    // Collapse the section
                    content.style.maxHeight = null;
                } else {
                    // Fetch data if not already fetched
                    if (!content.dataset.loaded) {
                        if (this.id === 'weather-widget') {
                            fetchWeatherData(content);
                        } else if (this.id === 'threat-intelligence') {
                            fetchThreatIntelligenceData(content);
                        } else if (this.id === 'vulnerability-report') {
                            fetchVulnerabilityData(content);
                        }
                        content.dataset.loaded = true;
                    }
                    // Expand the section
                    content.style.maxHeight = content.scrollHeight + "px";
                }
                this.classList.toggle('active');
            });
        });
    }

    // Function to fetch weather data
    function fetchWeatherData(content) {
        const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=your-city&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weather = data.weather[0].description;
                const temp = data.main.temp;
                content.innerHTML = `<p>${weather}, ${temp}°C</p>`;
            })
            .catch(error => {
                content.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
                console.error('Error fetching weather data:', error);
            });
    }

    // Function to fetch threat intelligence data
    function fetchThreatIntelligenceData(content) {
        const apiKey = '28752f1d3b911668224b0b08574545c12525d23dbe3f5e6ed98bcf30f8c2ec17'; // Replace with your API key
        const url = `https://www.virustotal.com/api/v3/files/44d88612fea8a8f36de82e1278abb02f`; // Replace with your specific file hash

        fetch(url, {
            headers: {
                'x-apikey': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            content.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(error => {
            content.innerHTML = `<p>Error fetching threat intelligence data: ${error.message}</p>`;
            console.error('Error fetching threat intelligence data:', error);
        });
    }

    // Function to fetch vulnerability data
    function fetchVulnerabilityData(content) {
        const url = `https://services.nvd.nist.gov/rest/json/cves/1.0`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                content.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
            })
            .catch(error => {
                content.innerHTML = `<p>Error fetching vulnerability data: ${error.message}</p>`;
                console.error('Error fetching vulnerability data:', error);
            });
    }
});
