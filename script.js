const initialsInput = document.getElementById("initials");
const bgColorInput = document.getElementById("bgColor");
const textColorInput = document.getElementById("textColor");

const avatarPreview = document.getElementById("avatarPreview");

function updateAvatar() {

    let initials = initialsInput.value.toUpperCase();

    avatarPreview.textContent = initials;

    avatarPreview.style.backgroundColor = bgColorInput.value;

    avatarPreview.style.color = textColorInput.value;
}

initialsInput.addEventListener("input", updateAvatar);

bgColorInput.addEventListener("input", updateAvatar);

textColorInput.addEventListener("input", updateAvatar);

updateAvatar();

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", downloadAvatar);

function downloadAvatar() {

    const exportSize = 2048;

    const canvas = document.createElement("canvas");

    canvas.width = exportSize;
    canvas.height = exportSize;

    const ctx = canvas.getContext("2d");

    // Better smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Draw circle
    ctx.fillStyle = bgColorInput.value;

    ctx.beginPath();

    ctx.arc(
        exportSize / 2,
        exportSize / 2,
        exportSize / 2,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // Text settings
    ctx.fillStyle = textColorInput.value;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Teams-like font weight
    ctx.font = `700 ${exportSize * 0.42}px "Segoe UI", Arial, sans-serif`;

    // Sharper rendering
    ctx.shadowColor = "transparent";

    const initials = initialsInput.value.toUpperCase();

    // Slight vertical correction
    ctx.fillText(
        initials,
        exportSize / 2,
        exportSize / 2 + exportSize * 0.03
    );

    // Export with maximum quality
    const image = canvas.toDataURL("image/png", 1.0);

    const link = document.createElement("a");

    link.download = "teams-avatar.png";

    link.href = image;

    link.click();
}