// --- Вертикальный ресайзер (между панелью и картой)
const leftPanel = document.querySelector(".left-panel");
const verticalResizer = document.querySelector(".vertical-resizer");
let isResizingVertical = false;

verticalResizer.addEventListener("mousedown", e => {
  isResizingVertical = true;
  document.body.style.cursor = "ew-resize";
});

document.addEventListener("mousemove", e => {
  if (!isResizingVertical) return;
  const newWidth = Math.min(Math.max(e.clientX, 250), window.innerWidth * 0.7);
  leftPanel.style.width = newWidth-40 + "px";
});

document.addEventListener("mouseup", () => {
  isResizingVertical = false;
  document.body.style.cursor = "default";
});

// --- Горизонтальный ресайзер (внутри панели)
const topSection = document.querySelector(".controls");
const infoSection = document.querySelector(".info");
const horizontalResizer = document.querySelector(".horizontal-resizer");
let isResizingHorizontal = false;
let startY, startTopHeight;

horizontalResizer.addEventListener("mousedown", e => {
  isResizingHorizontal = true;
  startY = e.clientY;
  startTopHeight = topSection.offsetHeight;
  document.body.style.cursor = "ns-resize";
});

document.addEventListener("mousemove", e => {
  if (!isResizingHorizontal) return;
  const dy = e.clientY - startY;
  const newHeight = Math.min(Math.max(startTopHeight + dy, 150), window.innerHeight - 200);
  topSection.style.flex = "none";
  topSection.style.height = newHeight-25 + "px";
});

document.addEventListener("mouseup", () => {
  isResizingHorizontal = false;
  document.body.style.cursor = "default";
});