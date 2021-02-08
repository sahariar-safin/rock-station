const handleSongs = () => {
    const songName = document.getElementById('songName').value;
    document.getElementById('searchResult').innerHTML = ' ';
    document.getElementById('songLyrics').innerHTML = " ";
    fetch(`https://api.lyrics.ovh/suggest/${ songName }`)
        .then(res => res.json())
        .then(info => {
            const searchResult = document.getElementById('searchResult');
            info.data.forEach(song => {
                const resultOne = document.createElement('div');
                resultOne.className = 'single-result row align-items-center my-3 p-3';
                resultOne.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${ song.title }</h3>
                <p class="author lead">Album by <span>${ song.artist.name }</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="handleLyrics('${ song.artist.name }','${ song.title }')" class="btn btn-success">Get Lyrics</button>
            </div>
            `;
                searchResult.appendChild(resultOne);
            });
        });
}
const handleLyrics = (artist, title) => {
    fetch(`https://api.lyrics.ovh/v1/${ artist }/${ title }`)
        .then(res => res.json())
        .then(data => {
            const songLyrics = document.getElementById('songLyrics');
            document.getElementById('songLyrics').innerHTML = " ";
            const lyric = document.createElement('p');
            lyric.innerText = `${ data.lyrics }`;
            songLyrics.appendChild(lyric);
        });
}