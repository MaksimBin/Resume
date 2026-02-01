// Создаём блок с сообщением
const messageBlock = document.createElement("div");
messageBlock.textContent = "Mobile version - поверните экран";
messageBlock.style.cssText = `
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: white;
  color: black;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  line-height: 100vh;
  z-index: 9999;
`;
document.body.appendChild(messageBlock);

// Функция проверки условий
function checkOrientation() {
  const isLandscape = window.innerWidth > window.innerHeight;
  const isWide = window.innerWidth > 400;

  if (isLandscape && isWide) {
    // Скрываем весь контент и показываем сообщение
    document.body.querySelectorAll("*:not(div)").forEach(el => {
      if (el !== messageBlock) el.style.display = "none";
    });
    messageBlock.style.display = "block";
  } else {
    // Возвращаем контент и скрываем сообщение
    document.body.querySelectorAll("*:not(div)").forEach(el => {
      if (el !== messageBlock) el.style.display = "";
    });
    messageBlock.style.display = "none";
  }
}

// Проверка при загрузке и изменении размера
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
checkOrientation();












(function() {
  const username = "MaksimBin"; // ← замени на свой GitHub username
  const btn = document.getElementById("showProjectsBtn");

  // Стили кнопки открытия
  btn.style.cssText = `
    display: block;
    margin: 20px auto;
    background: linear-gradient(90deg, #00ff88, #00cc44);
    color: #121212;
    padding: 12px 24px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
  `;
  btn.addEventListener("mouseover", () => btn.style.filter = "brightness(1.2)");
  btn.addEventListener("mouseout", () => btn.style.filter = "brightness(1)");

  // Модалка на весь экран
  const modal = document.createElement("div");
  modal.style.cssText = `
    display: none;
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.95);
    overflow-y: auto;
    z-index: 10000;
    padding: 40px 20px;
    box-sizing: border-box;
  `;

  const container = document.createElement("div");
  container.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  `;
  modal.appendChild(container);
  document.body.appendChild(modal);

  // Функция загрузки проектов
  async function fetchProjects() {
    container.innerHTML = "<p style='color:#00ff88;'>Загрузка...</p>";
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      const repos = await res.json();
      container.innerHTML = "";
      repos.forEach(repo => {
        if (repo.has_pages) {
          const card = document.createElement("div");
          card.style.cssText = `
            background: #1e1e1e;
            border-radius: 8px;
            padding: 20px;
            color: #e0e0e0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          `;
          const title = document.createElement("h3");
          title.textContent = repo.name;
          title.style.cssText = "color:#00ff88; margin-bottom:10px;";
          const desc = document.createElement("p");
          desc.textContent = repo.description || "Без описания";
          desc.style.cssText = "flex-grow:1; font-size:14px; margin-bottom:15px;";
          const openBtn = document.createElement("button");
          openBtn.textContent = "Открыть";
          openBtn.style.cssText = `
            background: linear-gradient(90deg, #00ff88, #00cc44);
            color: #121212;
            padding: 8px 16px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
            align-self: center;
          `;
          openBtn.addEventListener("mouseover", () => openBtn.style.filter = "brightness(1.2)");
          openBtn.addEventListener("mouseout", () => openBtn.style.filter = "brightness(1)");
          openBtn.addEventListener("click", () => {
            window.open(`https://${username}.github.io/${repo.name}`, "_blank");
            modal.style.display = "none"; // закрываем модалку
          });

          card.appendChild(title);
          card.appendChild(desc);
          card.appendChild(openBtn);
          container.appendChild(card);
        }
      });
      if (!container.children.length) {
        container.innerHTML = "<p style='color:#00ff88;'>Нет проектов с GitHub Pages</p>";
      }
    } catch (err) {
      container.innerHTML = "<p style='color:red;'>Ошибка загрузки</p>";
      console.error(err);
    }
  }

  // События
  btn.addEventListener("click", () => {
    modal.style.display = "block";
    fetchProjects();
  });
  // Закрытие по клику вне карточек (на фон)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
})();

