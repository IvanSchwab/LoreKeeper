import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/AuthConstants";
import "../styles/SignUp.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState<string>("");

  const auth = useAuth();
  const navigate = useNavigate(); 

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mail,
          password,
        }),
      });
  
      console.log("Response status:", response.status); 
      const json = await response.json();
      console.log("Response JSON:", json);
  
      if (response.ok) {
        console.log("Usuario creado correctamente");
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
    return <Navigate to="/LoreKeeper" />;
  }

  return (
    <div className="signup">
      <div className="signup-background"></div>
      <div className="signup-content">
        <h1 className="signup-title">Regístrate</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          {!!errorResponse && (
            <div className="errorMessage">{errorResponse}</div>
          )}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre completo"
            className="signup-input"
          />
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Correo electrónico"
            className="signup-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="signup-input"
          />
          <button type="submit" className="signup-button">
            Registrarse
          </button>
        </form>
        <div className="signup-footer">
          <p>
            ¿Ya tienes una cuenta? <a href="/">Inicia sesión</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
