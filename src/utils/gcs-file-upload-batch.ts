const BUCKET_NAME = "public-honor-triage";

export default async function uploadFiles(files: Array<File>): Promise<any> {
    try {
        const requests = new Array<Promise<Response>>();

        for(let file of files) {
            const newFileName = `${crypto.randomUUID()}_${Date.now().toPrecision()}_${file.name}`;
            const url = `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_NAME}/o?uploadType=media&name=${newFileName}`
    
            const req = {
                method: "POST",
                body: file
            }
    
            requests.push(fetch(url, req as any));
        }

        Promise.all(requests);
    } catch (error) {
        console.error(error);
    }
}