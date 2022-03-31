// const BUCKET_NAME = "green-sash-honors";
const BUCKET_NAME = "public-honor-triage";

export default async function uploadFile(file: File): Promise<any> {
    try {
        const newFileName = `${Date.now().toPrecision()}_${file.name}`;
        const url = `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_NAME}/o?uploadType=media&name=${newFileName}`

        const req = {
            method: "POST",
            body: file
        }

        await fetch(url, req as any);
    } catch (error) {
        console.error(error);
    }
}