const BUCKET_NAME = "public-honor-triage";

import { uuidv4 } from "./uuid";

export default { uploadFile, uploadFiles };

export async function uploadFile(file: File): Promise<any> {
    try {
        const url = buildURL(file.name);

        const headers = new Headers();
        headers.append("Content-Type", file.type);

        const req: Pick<Request, "method" | "headers" | "body"> = {
            method: "POST",
            headers: headers,
            body: file.stream(),
        }

        await fetch(url, req);
    } catch (error) {
        console.error(error);
    }
}

export async function uploadFiles(files: Array<File>): Promise<any> {
    try {
        const requests = new Array<Promise<Response>>();

        for (let file of files) {
            requests.push(uploadFile(file));
        }

        await Promise.all(requests);
    } catch (error) {
        console.error(error);
    }
}

function buildURL(filename: string): string {
    const uuid = uuidv4();
    const timestamp = Date.now().toPrecision();
    const ext = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
    const name = `${uuid}_${timestamp}.${ext}`;
    return `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_NAME}/o?uploadType=media&name=${name}`;
}
