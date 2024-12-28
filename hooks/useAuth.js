"use client";
import { auth, db } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // const handleAuthChange = (user) => {
  //   setCurrentUser(user);
  // };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       handleAuthChange(user);
  //     } else {
  //       handleAuthChange(null);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [currentUser]);
  useEffect(() => {
    let unsubscribeFirestore = null;
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          unsubscribeFirestore = onSnapshot(
            userRef,
            (doc) => {
              setCurrentUser({
                uid: user.uid,
                emailVerified: user.emailVerified,
                ...doc.data(),
              });
            },
            (error) => {
              console.log(error);
              setCurrentUser(null);
            }
          );
        } catch (error) {
          console.log(error);
        }

        // handleAuthChange(user);
      } else {
        if (unsubscribeFirestore) {
          unsubscribeFirestore();
          unsubscribeFirestore = null;
        }
        setCurrentUser(null);

        // handleAuthChange(null);
      }
    });
    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  }, []);

  const signupWithEmailAndPassword = async (email, password) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = newUser.user;
      const userData = {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        stripeCustomerId: null,
        stripe: {
          subscription_id: null,
          subscription_status: null,
          price_id: null,
          prod_id: null,
          current_period_start: null,
          current_period_end: null,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, userData);

      await sendEmailVerification(user);
      // handleAuthChange(user);
      return { user };
    } catch (error) {
      console.log(error);
      // handleAuthChange(null);
      return error;
    }
  };

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      const loggedInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const user = loggedInUser.user;
      // handleAuthChange(user);
      return { user: loggedInUser.user };
    } catch (error) {
      console.log(error);
      // handleAuthChange(null);
      return { error };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // handleAuthChange(null);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { error };
    }
  };

  return {
    currentUser,
    signupWithEmailAndPassword,
    loginWithEmailAndPassword,
    logout,
  };
};

export default useAuth;
