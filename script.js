let imageContainer = document.getElementById("current-image-container");

let imgArr = [];

async function getNasaData(date) {
  const data = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a&date=${date}`
  );
  const obj = await data.json();
  console.log(obj)

  const h1 = document.createElement("h1");
  const img = document.createElement("img");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");

  if (obj.code==400) {
    imageContainer.innerHTML=`${document.createElement("p").innerHTML="Error:"+obj.msg}`;
    return false;
  }

  let currentImg = {
    title: obj.title,
    imgUrl: obj.url,
    explanation: obj.explanation,
    date: obj.date,
  };
  imgArr.push(currentImg);

  
  imageContainer.innerHTML = "";

  h1.innerText =
    date != new Date().toISOString().split("T")[0]
      ? `Picture on ${currentImg.date}`
      : "NASA Picture of the Day";
  img.src = currentImg.imgUrl;
  img.style.width = "500px";
  img.style.height = "400px";
  h3.innerText = currentImg.title;
  p.innerText = currentImg.explanation;

  imageContainer.append(h1, img, h3, p);
  return true
}

function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  getNasaData(currentDate);

}

let dateArr = [];
async function getImageOfTheDay() {
  this.event.preventDefault();
  const searchinput = document.getElementById("search-input").value;
let errSuccess=await  getNasaData(searchinput);
if (errSuccess) {
    saveSearch(searchinput);
  addSearchToHistory();
}
}

const searchHistory = document.getElementById("search-history");
function addSearchToHistory() {
  let arr = JSON.parse(localStorage.getItem("searches"));
  searchHistory.innerHTML = "";

  if (!arr) {
    return;
  }
  arr.forEach((element) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.target = "_self";
    a.innerText = `${element.date}`;
    a.href = `#${element.date}`;
    li.appendChild(a);
    a.onclick = function (e) {
      const date = e.target.innerText;
      getNasaData(date);
    };

    searchHistory.appendChild(li);
  });
}

function saveSearch(searchinput) {
  if (dateArr) {
    dateArr.push({ date: searchinput });
    localStorage.setItem("searches", JSON.stringify(dateArr));
  } else {
    dateArr.push({ date: searchinput });

    localStorage.setItem("searches", JSON.stringify(dateArr));
  }
}

// render image of the day
getCurrentImageOfTheDay();
