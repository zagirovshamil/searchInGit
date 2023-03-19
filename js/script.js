const mainEl = document.querySelector(".main");
const wrapper = document.createElement("div");
const formEl = document.createElement("form");

formEl.classList.add("search");
formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const inputsValue = Object.fromEntries(new FormData(event.target));
  const response = await fetch(`
  https://api.github.com/users/${inputsValue.name}
  `);

  if (response.ok) {
    const data = await response.json();
    wrapper.appendChild(createProfileEl(data));
    mainEl.appendChild(wrapper);
  } else {
    alert("Пользователь не найден");
  }
});

const inputEl = document.createElement("input");
inputEl.classList.add("search-input");
inputEl.setAttribute("name", "name");

const searchButtonEl = document.createElement("button");
searchButtonEl.classList.add("search-button");
searchButtonEl.setAttribute("type", "submit");
searchButtonEl.innerHTML = "Поиск";

formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);
mainEl.appendChild(formEl);

function createProfileEl(profileData) {
  const element = document.createElement("div");
  element.classList.add("profile");
  element.innerHTML = `
    <img class="search-image" src=${profileData.avatar_url}></img>
    <p class="search-text"><span>Имя: </span>${profileData.name}</p>
    <p class="search-text"><span>Город: </span>${profileData.location}</p>
    <p class="search-text"><span>О себе: </span>${profileData.bio}</p>
    <p class="search-text"><span>Репозитории: </span>${profileData.public_repos}</p>
  `;
  element.appendChild(createDeleteEl());
  return element;
}

function createDeleteEl() {
  const element = document.createElement("button");
  element.classList.add("delete-button");
  element.innerHTML = "Удалить";
  element.addEventListener("click", (event) => {
    wrapper.innerHTML = "";
  });
  return element;
}
