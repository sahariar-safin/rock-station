const handleSongs = () => {
    const songName = document.getElementById('songName').value;
    document.getElementById('searchResult').innerHTML = ' ';
    document.getElementById('songLyrics').innerHTML = " ";
    document.getElementById('errorMassage').innerHTML = ' ';
    handleSpinner();
    fetch(`https://api.lyrics.ovh/suggest/${ songName }`)
        .then(res => res.json())
        .then(info => {
            const searchResult = document.getElementById('searchResult');
            info.data.forEach(song => {
                const resultOne = document.createElement('div');
                const songPreview = song.preview.split(':')[0] + "s:" + song.preview.split(':')[1];
                resultOne.className = 'single-result row align-items-center my-3 p-3';
                resultOne.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${ song.title }</h3>
                <p class="author lead">Album by <span>${ song.artist.name }</span></p>
                <audio controls>
                <source src="${ songPreview }" type="audio/mp3">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="handleLyrics('${ song.artist.name }','${ song.title }')" class="btn btn-success">Get Lyrics</button>
            </div>
            `;
                searchResult.appendChild(resultOne);
                handleSpinner();
            });
        })
        .catch(error => errorMassage(`We can't load this songs right now..! Please try again after some time!`));
}
const handleLyrics = (artist, title) => {
    document.getElementById('errorMassage').innerHTML = ' ';
    document.getElementById('songLyrics').innerHTML = " ";
    handleSpinner();
    fetch(`https://api.lyrics.ovh/v1/${ artist }/${ title }`)
        .then(res => res.json())
        .then(data => {
            const songLyrics = document.getElementById('songLyrics');
            const lyric = document.createElement('p');
            lyric.innerText = `${ data.lyrics }`;
            songLyrics.appendChild(lyric);
            handleSpinner();
        })
        .catch(error => errorMassage(`We can't load this lyrics right now..! Please try again after some time!`));
}
const errorMassage = (error) => {
    const displayError = document.getElementById('errorMassage');
    displayError.innerText = error;
};

const handleSpinner = () => {
    const spinner = document.getElementById('spinner');
    spinner.classList.toggle("d-none");
}

document.getElementById("songName").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        document.getElementById("searchBtn").click();
    }
});