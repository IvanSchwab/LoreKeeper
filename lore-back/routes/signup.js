const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");

// Manejador GET para pruebas
router.get("/", (req, res) => {
    res.send("Ruta GET signup alcanzada");
  });

  
router.post("/", (req, res) => {
  const { name, mail, password } = req.body;

  console.log("Datos recibidos:", { name, mail, password }); // Agrega un log para verificar los datos recibidos

  if (!!!name || !!!mail || !!!password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Campos requeridos",
      })
    );
  }

  // Lógica para crear el usuario (si existe)

  res.status(200).json(
    jsonResponse(200, {
      message: "Usuario creado con éxito",
    })
  );
});

module.exports = router;
