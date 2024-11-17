document.getElementById("imageInput").addEventListener("change", () => {
  const imageInput = document.getElementById("imageInput");
  const direction = document.getElementById("direction").value;
  const trigger = document.getElementById("trigger").value;
  const duration = document.getElementById("duration").value;

  const scroller = document.getElementById("imageScroller");
  scroller.innerHTML = ""; // Clear previous images

  Array.from(imageInput.files).forEach((file) => {
    const imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(file);

    // Wait for image to load to get its natural dimensions
    imgElement.onload = () => {
      imgElement.style.width = `${imgElement.naturalWidth}px`;
      imgElement.style.height = `${imgElement.naturalHeight}px`;

      scroller.appendChild(imgElement);

      const images = scroller.querySelectorAll("img");

      images.forEach((img, index) => {
        const startPos = getStartPosition(
          direction,
          index,
          imgElement,
          images.length
        );
        const endPos = getEndPosition(
          direction,
          index,
          imgElement,
          images.length
        );
        img.style.transform = `translate(${startPos.x}px, ${startPos.y}px)`;

        if (trigger === "click") {
          img.addEventListener("click", () =>
            animateImage(img, startPos, endPos, duration)
          );
        } else if (trigger === "hover") {
          img.addEventListener("mouseover", () =>
            animateImage(img, startPos, endPos, duration)
          );
        }
      });
    };
  });
});

// Get the starting position of the images based on the direction
function getStartPosition(direction, index, imgElement, totalImages) {
  const imgSize = {
    width: imgElement.naturalWidth,
    height: imgElement.naturalHeight,
  };
  switch (direction) {
    case "left":
      return { x: index * imgSize.width, y: 0 };
    case "right":
      return { x: -index * imgSize.width, y: 0 };
    case "top":
      return { x: 0, y: index * imgSize.height };
    case "bottom":
      return { x: 0, y: -index * imgSize.height };
  }
}

// Get the ending position of the images based on the direction
function getEndPosition(direction, index, imgElement, totalImages) {
  const imgSize = {
    width: imgElement.naturalWidth,
    height: imgElement.naturalHeight,
  };
  switch (direction) {
    case "left":
      return { x: -totalImages * imgSize.width, y: 0 };
    case "right":
      return { x: totalImages * imgSize.width, y: 0 };
    case "top":
      return { x: 0, y: -totalImages * imgSize.height };
    case "bottom":
      return { x: 0, y: totalImages * imgSize.height };
  }
}

// Animate the image based on the parameters
function animateImage(img, startPos, endPos, duration) {
  img.style.transition = `transform ${duration}s`;
  img.style.transform = `translate(${endPos.x}px, ${endPos.y}px)`;
}
