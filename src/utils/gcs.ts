import { uuidv4 } from "./uuid"
import { getStorage, ref, uploadBytes, UploadResult } from "@firebase/storage"

export default { uploadFile, uploadFiles }

export async function uploadFile(file: File): Promise<UploadResult> {
    try {
        const storage = getStorage()
        const filename = createNewFilename(file.name)
        const storageRef = ref(storage, filename)

        return await uploadBytes(storageRef, file)
    } catch (error) {
        console.error(error)
        return Promise.reject(error)
    }
}

export async function uploadFiles(files: Array<File>): Promise<void> {
    try {
        const requests = new Array<Promise<UploadResult>>()

        for (const file of files) {
            requests.push(uploadFile(file))
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
        ".image" // add this to indicate that an extension was not found
    return `${uuid}_${timestamp}.${ext}`
}
