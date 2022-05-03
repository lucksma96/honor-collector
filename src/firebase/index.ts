import { connectStorageEmulator, getStorage } from "@firebase/storage"
import { initializeApp } from "firebase/app"

export default function startFirebase(): void {
    const firebaseConfig = {
        apiKey: "AIzaSyD7EmBG4IxKqOuN2coTSpdaHfddXkpXN_4",
        authDomain: "honor-collector.firebaseapp.com",
        projectId: "honor-collector",
        storageBucket: "honor-collector.appspot.com",
        messagingSenderId: "33378599412",
        appId: "1:33378599412:web:e2534451c4ddd82f20b9a1",
        measurementId: "G-CXGXSMR7QQ",
    }

    const app = initializeApp(firebaseConfig)
    const storage = getStorage(app)
    storage.maxUploadRetryTime = 30000 // 30s
    connectStorageEmulator(storage, "localhost", 9199)
}
