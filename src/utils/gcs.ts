import { uuidv4 } from "./uuid"
//import { getStorage, ref, uploadBytes } from "@firebase/storage";

export default { uploadFile, uploadFiles }

export async function uploadFile(file: File): Promise<void> {
    try {
        //const storage = getStorage();
        const filename = createNewFilename(file.name)
        //const storageRef = ref(storage, filename);

        //await uploadBytes(storageRef, file);
    } catch (error) {
        console.error(error)
    }
}

export async function uploadFiles(files: Array<File>): Promise<void> {
    try {
        const requests = new Array<Promise<Response>>()

        for (const file of files) {
            //requests.push(uploadFile(file));
        }

        await Promise.all(requests)
    } catch (error) {
        console.error(error)
    }
}

function createNewFilename(filename: string): string {
    const uuid = uuidv4()
    const timestamp = Date.now().toPrecision()
    const ext =
        filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
        filename
    return `${uuid}_${timestamp}.${ext}`
}
