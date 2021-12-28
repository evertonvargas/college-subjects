import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";

import { supabase } from "../services/supabase";
import { useSession } from "../hooks/useSession";

import styles from "./../styles/login.module.scss";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail inválido.")
    .required("O e-mail é obrigatório."),
  password: yup.string().required("A senha é obrigatória."),
});

const MyForm = () => {
  const { setSessionData } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      onSubmit: async ({ email, password }, { resetForm }) => {
        const { user, session, error } = await supabase.auth.signIn({
          email,
          password,
        });

        setSessionData(session);

        if (session) {
          router.push({
            pathname: "/addTask",
          });
        } else {
          toast.error("Autenticação falhou", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          resetForm();
        }
      },
      validationSchema,
      initialValues: {
        email: "",
        password: "",
      },
    });

  return (
    <div className={styles.container}>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <div className={styles.username}>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Type your username"
            />
          </div>
          {touched.email && errors.email ? (
            <div className={styles.error}>{errors.email}</div>
          ) : null}

          <label className={styles.labelPassword}>Password</label>
          <div className={styles.password}>
            <input
              placeholder="Type your password"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <img
              src={showPassword ? "/eye.svg" : "/eyeHidden.svg"}
              alt="eye"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {touched.password && errors.password ? (
            <div className={styles.error}>{errors.password}</div>
          ) : null}

          <div className={styles.mainDiv}>
            <div></div>
            <button type="submit"> Login </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyForm;
