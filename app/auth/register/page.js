"use client";
import FloatingLabelInput from "@/components/FloatingLabelInput/FloatingLabelInput.component";
import { openSans } from "@/global/fonts";
import { useRef, useState, useEffect } from "react";
import styles from "../auth.module.css";
import ElevatedButton from "@/components/ElevatedButton/ElevatedButton.component";
import OutlinedButton from "@/components/OutlinedButton/OutlinedButton.component";
import Divider from "@/components/Divider/Divider.component";
import Link from "next/link";
import { doesEmailExist } from "@/utils/user";
import { useAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function Register() {
  const { signupWithEmailAndPassword } = useAuthContext();
  const { isLoading } = useProtectedRoute();
  const formRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const checkEmailAvailability = async (email) => {
    try {
      if (email && isEmailValid) {
        const emailExists = await doesEmailExist(email);
        console.log(emailExists);
        !emailExists ? setIsEmailAvailable(true) : setIsEmailAvailable(false);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    const email = data.email;
    const password = data.password;
    const response = await signupWithEmailAndPassword(email, password);
    response && response.error && setError(response.error);
    console.log(formData.get("email"), formData.get("password"));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <main>
      <section
        className={`${openSans.className} ${styles["authform-section"]}`}
      >
        <p className={`${styles.heading}`}>Create an account</p>
        <OutlinedButton
          variant="pill"
          backgroundColor="white"
          borderColor="var(--md-sys-color-outline-variant)"
          customIcon="verified"
        >
          Continue with Google
        </OutlinedButton>
        <Divider text="or" textPosition="center" />
        <form
          id="signupForm"
          ref={formRef}
          onSubmit={handleFormSubmit}
          className={`${styles["auth-form"]}`}
        >
          <FloatingLabelInput
            id="email"
            name="email"
            label="Email"
            type="email"
            icon={isEmailAvailable ? "verified" : null}
            onChange={(e) => {
              e.preventDefault();
              setIsEmailAvailable(null);
              setEmail(e.target.value.replace(/\s/g, ""));
              console.log(e.target.value);
              const isValid = e.target.checkValidity();
              isValid ? setIsEmailValid(true) : setIsEmailValid(false);
            }}
            onBlur={(e) => {
              e.preventDefault();
              setIsEmailAvailable(null);
              isEmailValid && setEmailLoading(true);
              isEmailValid && checkEmailAvailability(e.target.value);
            }}
            spinner={emailLoading}
            required
          />
          <FloatingLabelInput
            id="password"
            name="password"
            label="Password"
            type={passwordVisible ? "text" : "password"}
            icon={passwordVisible ? "visibility" : "visibility_off"}
            iconAction={togglePasswordVisibility}
            required
          />
          <ElevatedButton type="submit" variant="pill">
            Create account
          </ElevatedButton>
        </form>
        <p style={{ fontSize: "0.8rem" }}>
          Already have an account? <Link href="/auth/login">Log in</Link>
        </p>
        {error && <p style={{ color: "var(--md-sys-color-error)" }}>{error}</p>}
      </section>
    </main>
  );
}
