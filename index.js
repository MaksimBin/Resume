// Создаём блок с сообщением
const messageBlock = document.createElement("div");
messageBlock.textContent = "Поверните экран";
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