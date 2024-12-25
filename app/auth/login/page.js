"use client";
import FloatingLabelInput from "@/components/FloatingLabelInput/FloatingLabelInput.component";
import { openSans } from "@/global/fonts";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import styles from "../auth.module.css";
import ElevatedButton from "@/components/ElevatedButton/ElevatedButton.component";
import OutlinedButton from "@/components/OutlinedButton/OutlinedButton.component";
import Divider from "@/components/Divider/Divider.component";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
// import { loginAction } from "@/actions/auth/loginAction";

export default function Login() {
  const { loginWithEmailAndPassword, currentUser } = useAuthContext();
  const { isLoading } = useProtectedRoute();
  const formRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    const email = data.email.replace(/\s/g, "");
    const password = data.password;
    startTransition(async () => {
      const response = await loginWithEmailAndPassword(email, password);
      response && response.error && setError(response.error);
      console.log(data);
    });
  };

  return (
    <main>
      <section
        className={`${openSans.className} ${styles["authform-section"]}`}
      >
        <p className={`${openSans.className} ${styles.heading}`}>
          Welcome back!
        </p>
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
          // action={formAction}
          onSubmit={handleFormSubmit}
          className={`${styles["auth-form"]}`}
        >
          <FloatingLabelInput
            id="email"
            name="email"
            label="Email"
            type="email"
            onChange={(e) => {
              e.preventDefault();
              setError(null);
              // setEmail(e.target.value.replace(/\s/g, ""));
              console.log(e.target.value);
              const isValid = e.target.checkValidity();
              isValid ? setIsEmailValid(true) : setIsEmailValid(false);
            }}
            required
          />
          <FloatingLabelInput
            id="password"
            name="password"
            label="Password"
            onChange={(e) => {
              setError(null);
            }}
            type={passwordVisible ? "text" : "password"}
            iconAction={togglePasswordVisibility}
            icon={passwordVisible ? "visibility" : "visibility_off"}
            required
          />
          <ElevatedButton type="submit" variant="pill" disabled={!isEmailValid || isPending}>
            {isPending ? "Loading..." : "Sign in"}
          </ElevatedButton>
        </form>
        <p style={{ fontSize: "0.8rem" }}>
          Don't have an account?{" "}
          <Link href="/auth/register">Create an account</Link>
        </p>
        {error && (
          <p
            style={{ color: "var(--md-sys-color-error)" }}
          >{`Something went wrong. Please try again later.`}</p>
        )}
      </section>
    </main>
  );
}
