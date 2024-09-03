const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const UserSchema = require("../schema/user.js");

// Manejador GET para pruebas
router.get("/", (req, res) => {
  res.send("Ruta GET signup alcanzada");
});

router.post("/", async (req, res) => {
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
  // const user = new UserSchema({ name, mail, password });
  try {
    const user = new UserSchema();
    const exist = await user.userExist(mail);
    if (exist) {
      return res.status(400).json(
        jsonResponse(400, {
          error: "El mail ya existe!",
        })
      );
    } else {
      const newUser = new UserSchema({ name, mail, password });
      newUser.save();

      res.status(200).json(
        jsonResponse(200, {
          message: "Usuario creado con éxito",
        })
      );
    }
  } catch (error) {
    res.status(500).json(
      jsonResponse(500, {
        error: "Error al crear usuario",
      })
    );
  }
});

module.exports = router;
