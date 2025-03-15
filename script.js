async function searchArtist() {
    const query = document.getElementById('search-artist').value.trim();
    if (!query) return;
    
    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=musicArtist&limit=10`);
        const data = await response.json();
        displayArtists(data.results);
    } catch (error) {
        console.error('Erro ao buscar artistas:', error);
    }
}

async function getArtistImage(artistId) {
    try {
        const response = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&entity=album&limit=1`);
        const data = await response.json();
        const album = data.results.find(item => item.collectionType === 'Album');
        return album ? album.artworkUrl100.replace('100x100', '400x400') : '';
    } catch (error) {
        console.error('Erro ao buscar imagem do artista:', error);
        return '';
    }
}

async function displayArtists(artists) {
    const container = document.getElementById('artists-container');
    container.innerHTML = '';
    
    if (artists.length === 0) {
        container.innerHTML = '<p>Nenhum artista encontrado.</p>';
        return;
    }
    
    for (const artist of artists) {
        const imageUrl = await getArtistImage(artist.artistId);
        
        const card = document.createElement('div');
        card.classList.add('artist-card');
        card.innerHTML = `
            <img src="${imageUrl || 'placeholder.jpg'}" alt="${artist.artistName}" class="artist-image">
            <h3>${artist.artistName}</h3>
            <p>Gênero: ${artist.primaryGenreName || 'Desconhecido'}</p>
        `;
        container.appendChild(card);
    }
}