import { validationResult } from "express-validator";



export function manejarErroresDeValidacion(req, res, next) {
  const errores = validationResult(req);
  
  if (!errores.isEmpty()) {
    const mensajes = errores.array().map(error => ({ mensaje: error.msg }));
    return res.status(400).json({
      estado: 'error',
      mensaje: 'Validación fallida',
      errores: mensajes
    });
  }

  next(); // Si no hay errores, continúa con el controlador
}