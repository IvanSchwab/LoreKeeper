const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const UserSchema = require("../schema/user.js");
const getUserInfo = require("../lib/getUserInfo.js");

// Manejador GET para pruebas
router.get("/", (req, res) => {
  res.send("Ruta GET login alcanzada");
});

router.post("/", async (req, res) => {
  const { name, mail, password } = req.body;

  console.log("Datos recibidos:", { mail, password }); // Agrega un log para verificar los datos recibidos

  if (!!!mail || !!!password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Campos requeridos",
      })
    );
  }

  const user = await UserSchema.findOne({ mail });

  // Lógica para autenticar el usuario

  if (user) {
    const correctPassword = await user.comparePassword(password, user.password);
    if (correctPassword) {
      const accessToken = user.createAccessToken();
      const refreshToken = await user.createRefreshToken();

      res.status(200).json(
        jsonResponse(200, {
          message: "Usuario autenticado con éxito",
          user: getUserInfo(user),
          accessToken,
          refreshToken,
        })
      );
    } else {
      res
        .status(400)
        .json(jsonResponse(400, { error: "Usuario o contraseña incorrectas" }));
    }
  } else {
    res.status(400).json(jsonResponse(400, { error: "Usuario no encontrado" }));
  }
});

module.exports = router;
