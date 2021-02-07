const handleSongs = () => {
    const songName = document.getElementById('songName').value;
    fetch(`https://api.lyrics.ovh/suggest/${ songName }`)
        .then(res => res.json())
        .then(info => {
            const searchResult = document.getElementById('searchResult');
            info.data.forEach(element => {
                console.log(element.album.title);
                const resultOne = document.createElement('div');
                resultOne.className = 'single-result row align-items-center my-3 p-3';
                resultOne.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${ element.title }</h3>
                <p class="author lead">Album by <span>${element.album.title}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success">Get Lyrics</button>
            </div>
            `;
            searchResult.appendChild(resultOne);
            });
        })
}
// const handleLyrics = () =>{
//     fetch(`https://api.lyrics.ovh/v1/:artist/:title`)
// }