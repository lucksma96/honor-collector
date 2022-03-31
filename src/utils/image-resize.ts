const MAX_WIDTH = 256;
const MAX_HEIGHT = 256;

export default function resizeImageFile(image: HTMLImageElement) : string {
    let width = image.width;
    let height = image.height;

    if (width > height) {
        if (width > MAX_WIDTH) {
            height = height * (MAX_WIDTH / width);
            width = MAX_WIDTH;
        }
    } else {
        if (height > MAX_HEIGHT) {
            width = width * (MAX_HEIGHT / height);
            height = MAX_HEIGHT;
        }
    }

    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image, 0, 0, width, height);

    URL.revokeObjectURL(image.src);

    return ctx?.canvas.toDataURL() || "";
}