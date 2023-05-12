// Menginisialisasi WebFont
WebFont.load({
    google: {
        families: ['all'] // Memuat semua Google Fonts families
    }
});
// Mendapatkan daftar font dari Google Fonts API & diurutkan berdasarkan popularity
fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD2b0qESopMlPL3c09cUM4ZgjfmfRTQ5Dc&sort=popularity')
    .then(response => response.json())
    .then(data => {
        const fontSelect = document.getElementById('font-select');
        const fontSearch = document.getElementById('font-search');
        const cardTitle = document.getElementById('card-title');
        const cardText = document.getElementById('card-text');

    // Dinamis menghasilkan opsi untuk pemilihan font
    data.items.forEach(font => {
        const option = document.createElement('option');
        option.text = font.family;
        fontSelect.add(option);
    });

    // Filter font berdasarkan kueri pencarian
    const filterFonts = (query) => {
        const filteredFonts = data.items.filter(font => font.family.toLowerCase().includes(query.toLowerCase()));
        return filteredFonts;
    };

    // Memperbarui opsi pemilihan font berdasarkan kueri pencarian
    const updateFontSelect = (query) => {
        fontSelect.innerHTML = '';
        const filteredFonts = filterFonts(query);
        filteredFonts.forEach(font => {
            const option = document.createElement('option');
            option.text = font.family;
            fontSelect.add(option);
        });
    };

    // Tambahkan event listener untuk pencarian font
    fontSelect.addEventListener('change', (event) => {
        const selectedFont = getSelectedFont();
        updatePreview(selectedFont);
        canvasFont = selectedFont;
    });

    fontSearch.addEventListener('input', (event) => {
        const searchQuery = event.target.value;
        updateFontSelect(searchQuery);
    });

    // Perbarui dummy preview font
    const updatePreview = (fontFamily) => {
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css?family=${encodeURIComponent(fontFamily)}`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        cardTitle.style.fontFamily = fontFamily;
        cardText.style.fontFamily = fontFamily;
    };

    function getSelectedFont() {
        const selectElement = document.getElementById('font-select');
        return selectElement.value;
    }
})
.catch(error => console.error(error));
