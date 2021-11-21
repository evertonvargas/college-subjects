import { useState } from "react";
import { FormEvent } from "react";
import { supabase } from "../services/supabase";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as yup from "yup";

import styles from "./../styles/login.module.scss";
import "react-toastify/dist/ReactToastify.css";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail inválido.")
    .required("O e-mail é obrigatório."),
  password: yup.string().required("A senha é obrigatória."),
});

const MyForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    schema
      .validate({
        email: name,
        password: password,
      })
      .then(async function (valid) {
        const { user, session, error } = await supabase.auth.signIn({
          email: name,
          password: password,
        });

        if (session) {
          router.push({
            pathname: "/protected/addTask",
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
        }
      })
      .catch(function (err) {
        toast.error(err.errors[0], {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });

    setName("");
    setPassword("");
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} noValidate>
          <label>Username</label>
          <div className={styles.username}>
            <input
              type="email"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your username"
            />
          </div>

          <label>Password</label>
          <div className={styles.password}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password"
            />
            <img
              src={showPassword ? "/eye.svg" : "/eyeHidden.svg"}
              alt="eye"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className={styles.resetPassword}>
            <a href="#">Forgot password?</a>
          </div>

          <div className={styles.mainDiv}>
            <div></div>
            <button> Login </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyForm;
