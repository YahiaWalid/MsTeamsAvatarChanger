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

    const exportSize = 4096;

    const initials = initialsInput.value.toUpperCase();

    const bgColor = bgColorInput.value;

    const textColor = textColorInput.value;

    // Create SVG — full square fill so Teams' own circular crop is seamless
    const svg = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${exportSize}"
        height="${exportSize}"
        viewBox="0 0 ${exportSize} ${exportSize}"
    >
        <rect
            width="${exportSize}"
            height="${exportSize}"
            fill="${bgColor}"
        />

        <text
            x="50%"
            y="53%"
            text-anchor="middle"
            dominant-baseline="middle"
            font-family="Segoe UI, Arial, sans-serif"
            font-size="${exportSize * 0.43}"
            font-weight="600"
            fill="${textColor}"
        >
            ${initials}
        </text>
    </svg>
    `;

    // Convert SVG to image
    const blob = new Blob([svg], {
        type: "image/svg+xml;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);

    const img = new Image();

    img.onload = function () {

        const canvas = document.createElement("canvas");

        canvas.width = exportSize;
        canvas.height = exportSize;

        const ctx = canvas.getContext("2d");

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(img, 0, 0);

        URL.revokeObjectURL(url);

        // Export PNG
        const png = canvas.toDataURL("image/png", 1.0);

        const link = document.createElement("a");

        link.download = "teams-avatar.png";

        link.href = png;

        link.click();
    };

    img.src = url;
}