const handleSongs = () => {
    const songName = document.getElementById('songName').value;
    fetch(`https://api.lyrics.ovh/suggest/${ songName }`)
        .then(res => res.json())
        .then(info => {
            const searchResult = document.getElementById('searchResult');
            info.data.forEach(element => {
                const resultOne = document.createElement('div');
                resultOne.className = 'single-result row align-items-center my-3 p-3';
                resultOne.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${ element.title }</h3>
                <p class="author lead">Album by <span>${element.album.title}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="handleLyrics('${element.artist.name}','${element.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
            `;
            searchResult.appendChild(resultOne);
            });
        });
}
const handleLyrics = (artist, title) =>{
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => {
        const songLyrics = document.getElementById('songLyrics');
        document.getElementById('songLyrics').innerHTML = " ";
        const lyric = document.createElement('p');
        lyric.innerText = `${data.lyrics}`;
        songLyrics.appendChild(lyric);
    });
}