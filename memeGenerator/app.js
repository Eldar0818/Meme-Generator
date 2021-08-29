const imageFileInput = document.querySelector("#imageFile-input");
const topTextInput = document.querySelector("#topText-input");
const bottomTextInput = document.querySelector("#bottomText-input");
const canvas = document.querySelector("#meme");

let image; // when upload new image...

imageFileInput.addEventListener("change", () => {
    const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

    image = new Image();
    image.src = imageDataUrl;

    image.addEventListener("load", () => {
        uppdateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
    }, {once: true});

} );

topTextInput.addEventListener("change", () => {
    uppdateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});
bottomTextInput.addEventListener("change", () => {
    uppdateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});


function uppdateMemeCanvas(canvas, image, topText, bottomText){
    const ctx = canvas.getContext("2d");
    const width = image.width;
    const height = image.height;
    const fontSize = Math.floor(width / 10);
    const yOffset = height / 25;

    // uppdate canvas background...
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    // prepare text...
    ctx.strokeStyle = "black"; //border of the text will black...
    ctx.lineWidth = Math.floor(fontSize / 4); // border size...
    ctx.fillStyle = "white"; // text color...
    ctx.textAlign = "center"; // text align will center in canvas...
    ctx.lineJoin = "round"; // for good looking text...
    ctx.font = `${fontSize}px` //this is the font size of texts...

    // add top text...
    ctx.textBaseline = "top";
    ctx.strokeText(topText, width / 2, yOffset);
    ctx.fillText(topText, width / 2, yOffset);
    
    // add bottom text...
    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomText, width / 2, height - yOffset);
    ctx.fillText(bottomText, width / 2, height - yOffset);
}