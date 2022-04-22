// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default function startFirebase(): any {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyD7EmBG4IxKqOuN2coTSpdaHfddXkpXN_4",
        authDomain: "honor-collector.firebaseapp.com",
        projectId: "honor-collector",
        storageBucket: "honor-collector.appspot.com",
        messagingSenderId: "33378599412",
        appId: "1:33378599412:web:e2534451c4ddd82f20b9a1",
        measurementId: "G-CXGXSMR7QQ"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
}