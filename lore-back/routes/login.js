const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");

// Manejador GET para pruebas
router.get("/", (req, res) => {
  res.send("Ruta GET login alcanzada");
});

router.post("/", (req, res) => {
  const { name, mail, password } = req.body;

  console.log("Datos recibidos:", { mail, password }); // Agrega un log para verificar los datos recibidos

  if (!!!mail || !!!password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Campos requeridos",
      })
    );
  }

  // Lógica para autenticar el usuario

  const accessToken = "access_token";
  const refreshToken = "refresh_token";
  const user = {
    id: "1",
    mail: "carlos@gmail",
    password: "carlos",
  };

  res.status(200).json(
    jsonResponse(200, {
      message: "Usuario autenticado con éxito",
      user,
      accessToken,
      refreshToken,
    })
  );
});

module.exports = router;
