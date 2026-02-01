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

  // Стили для кнопки с hover‑эффектом
  btn.style.cssText = `
    background: linear-gradient(90deg, #00ff88, #00cc44);
    color: #121212;
    padding: 10px 20px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
  `;
  btn.addEventListener("mouseover", () => {
    btn.style.filter = "brightness(1.2)";
  });
  btn.addEventListener("mouseout", () => {
    btn.style.filter = "brightness(1)";
  });

  // Создаём модалку
  const modal = document.createElement("div");
  modal.style.cssText = `
    display: none;
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.8);
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  const content = document.createElement("div");
  content.style.cssText = `
    background: #1e1e1e;
    border-radius: 8px;
    padding: 20px;
    min-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    color: #e0e0e0;
    transform: scale(0.9);
    transition: transform 0.3s ease;
  `;
  const title = document.createElement("h2");
  title.textContent = "Мои проекты";
  title.style.cssText = "color:#00ff88; margin-bottom:10px;";
  const list = document.createElement("ul");
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Закрыть";
  closeBtn.style.cssText = `
    margin-top: 15px;
    background: linear-gradient(90deg, #00ff88, #00cc44);
    color: #121212;
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
  `;
  closeBtn.addEventListener("mouseover", () => {
    closeBtn.style.filter = "brightness(1.2)";
  });
  closeBtn.addEventListener("mouseout", () => {
    closeBtn.style.filter = "brightness(1)";
  });

  content.appendChild(title);
  content.appendChild(list);
  content.appendChild(closeBtn);
  modal.appendChild(content);
  document.body.appendChild(modal);

  // Функция загрузки проектов
  async function fetchProjects() {
    list.innerHTML = "<li>Загрузка...</li>";
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      const repos = await res.json();
      list.innerHTML = "";
      repos.forEach(repo => {
        if (repo.has_pages) {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = `https://${username}.github.io/${repo.name}`;
          a.textContent = repo.name;
          a.target = "_blank";
          a.style.cssText = `
            display:inline-block;
            background: linear-gradient(90deg, #00ff88, #00cc44);
            color:#121212;
            text-decoration:none;
            font-weight:bold;
            padding:6px 12px;
            border-radius:4px;
            margin:4px 0;
            transition: all 0.3s ease;
          `;
          a.addEventListener("mouseover", () => {
            a.style.filter = "brightness(1.2)";
          });
          a.addEventListener("mouseout", () => {
            a.style.filter = "brightness(1)";
          });
          li.appendChild(a);
          list.appendChild(li);
        }
      });
      if (!list.children.length) {
        list.innerHTML = "<li>Нет проектов с GitHub Pages</li>";
      }
    } catch (err) {
      list.innerHTML = "<li>Ошибка загрузки</li>";
      console.error(err);
    }
  }

  // События
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
    setTimeout(() => {
      modal.style.opacity = "1";
      content.style.transform = "scale(1)";
    }, 10);
    fetchProjects();
  });
  closeBtn.addEventListener("click", () => {
    modal.style.opacity = "0";
    content.style.transform = "scale(0.9)";
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.opacity = "0";
      content.style.transform = "scale(0.9)";
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  });
})();
