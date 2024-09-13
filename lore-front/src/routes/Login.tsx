import { Navigate, useNavigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/AuthConstants";
import { useState } from "react";
import "../styles/Login.css";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const navigate = useNavigate(); 
  
  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "mail") {
      setMail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // auth.setIsAuthenticated(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail, password }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        } else{
          console.log((json))
          console.log("Usuario no guardado")
        }
        navigate("/LoreKeeper"); 
      } else {
        const json = (await response.json()) as AuthResponseError;

        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="login">
      <div className="login-background"></div>
      <div className={`login-content ${errorResponse ? "error-active" : ""}`}>
        <h1 className="login-title">Inicia sesión</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {!!errorResponse && (
            <div
              className={`errorMessage ${errorResponse ? "error-active" : ""}`}
            >
              {errorResponse}
            </div>
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            className="login-input"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button">Iniciar sesión</button>
        </form>
        <div className="login-footer">
          <p>
            ¿Primera vez en Lore Keeper?<a href="/signup">Suscríbete ahora</a>.
          </p>
          <p>
            Esta página está protegida por Google reCAPTCHA para asegurarnos de
            que no eres un robot.{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Más información
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
