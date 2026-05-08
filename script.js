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

    const canvas = document.createElement("canvas");

    const size = 1024;

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");

    // Transparent background automatically exists

    // Draw circle
    ctx.fillStyle = bgColorInput.value;

    ctx.beginPath();

    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);

    ctx.fill();

    // Draw text
    ctx.fillStyle = textColorInput.value;

    ctx.font = "600 420px Segoe UI";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        initialsInput.value.toUpperCase(),
        size / 2,
        size / 2 + 10
    );

    // Download image
    const link = document.createElement("a");

    link.download = "teams-avatar.png";

    link.href = canvas.toDataURL("image/png");

    link.click();
}