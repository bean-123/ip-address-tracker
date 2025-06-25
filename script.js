document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('ipForm');
      const ipInput = document.getElementById('ipInput');

      const apiKey = 'at_47lEIutTnwW5WkXXYszf8id3bh7Jb';

      // Initialize Leaflet map globally so we can update it later
      const map = L.map('map').setView([51.505, -0.09], 13); // Default center (London)
      let marker;

      // Add OpenStreetMap tiles to map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      async function fetchIP(ip = '') {
        try {
          const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}${
            ip ? `&ipAddress=${ip}` : ''
          }`;
          const response = await fetch(url);
          const data = await response.json();

          document.getElementById('ip').textContent = data.ip;
          document.getElementById('location').textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
          document.getElementById('timezone').textContent = `UTC ${data.location.timezone}`;
          document.getElementById('isp').textContent = data.isp;

          updateMap(data.location.lat, data.location.lng);
        } catch (error) {
          alert('Failed to fetch IP info.');
          console.error(error);
        }
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        fetchIP(ipInput.value.trim());
      });

      function updateMap(lat, lng) {
        map.setView([lat, lng], 13);

        if (marker) {
          map.removeLayer(marker);
        }

        //Your custom icon marker
        const customIcon = L.icon({
            iconUrl: 'images/icon-location.svg',
            iconSize: [30, 40],
            iconAnchor: [15, 40]
        });

        marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
      }

      // Initial fetch for current user's IP info   
      fetchIP();
    });