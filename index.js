const accesskey = "_kajQjY2UjSs0XsdhMacSp4BQwyAOtFx7eSlKy_vNd4"

const formEl = document.querySelector("form")
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButton= document.getElementById("show-more-button");

let inputData = "";
let page = 1;

// function searchImage(){
//     inputData = searchInputEl.value;
//     // console.log(inputData); 
//     const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;
//     console.log(url)
// }

async function searchImages() {
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`
    // console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);

    if (page === 1) {
        searchResultsEl.innerHTML = "";
    }
    const results = data.results;
    // console.log(results)
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        // console.log(result);
        imageLink.textContent = result.alt_description;

        // append all this created elements to the existing one.
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWrapper);
    });
    page++;
    // console.log(page);




    if (page > 1) {
        showMoreButton.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    // console.log("submited");
    searchImages();
});

showMoreButton.addEventListener("click", ()=>{
    searchImages();
})