"use server";
import { adminDb } from "@/firebase/firebaseAdmin";

async function doesEmailExist(email) {
  try {
    console.log("Checking email: ", email);
    const usersRef = adminDb.collection("users");
    const q = usersRef.where("email", "==", email).limit(1);
    const snapshot = await q.get();
    console.log("Snapshot: ", !snapshot.empty);
    return !snapshot.empty;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

export { doesEmailExist };
