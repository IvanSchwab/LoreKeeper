import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/AuthConstants";
import "../styles/Login.css";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState<string>("");

  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail,
          password,
        }),
      });

      console.log("Response status:", response.status);
      const json = await response.json();
      console.log("Response JSON:", json);

      if (response.ok) {
        console.log("Usuario autenticado correctamente");
        setErrorResponse("");
        navigate("/");
      } else {
        console.log("Ocurrió un error");
        setErrorResponse(json.body.error || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setErrorResponse("Error de red o servidor");
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/LoreKeeper"></Navigate>;
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
            ¿Primera vez en Lore Keeper? <a href="/signup">Suscríbete ahora</a>.
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
