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