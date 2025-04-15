import { body } from 'express-validator';

export function validarSuperheroe() {
  return [
    body('nombreSuperHeroe')
      .notEmpty().withMessage("Campo 'nombreSuperHeroe' obligatorio.")
      .isLength({ min: 3, max: 60 }).withMessage("Ingrese un nombre de superhéroe válido con una longitud entre 3 y 60 caracteres.")
      .trim(),

    body('nombreReal')
      .notEmpty().withMessage("Campo 'nombreReal' obligatorio.")
      .isLength({ min: 3, max: 60 }).withMessage("Ingrese un nombre real válido con una longitud entre 3 y 60 caracteres.")
      .trim(),

    body('edad')
      .notEmpty().withMessage("Campo 'edad' obligatorio.")
      .isInt({ min: 0 }).withMessage("Ingrese un número entero no negativo."),

    body('planetaOrigen')
      .optional()
      .isLength({ min: 1, max: 100 }).withMessage("Planeta de origen debe tener entre 1 y 100 caracteres.")
      .trim(),

    body('poderes')
      .notEmpty().withMessage("Campo 'poderes' obligatorio.")
      .custom(value => {
        if (!value || typeof value !== 'string') throw new Error("Poderes inválidos.");
        const poderesArray = value.split(',').map(p => p.trim()).filter(p => p.length >= 3 && p.length <= 60);
        if (poderesArray.length === 0) throw new Error("El campo poderes debe contener al menos un poder válido (entre 3 y 60 caracteres).");
        return true;
      }),

    body('debilidad')
      .optional()
      .custom(value => {
        if (typeof value !== 'string') return true;
        const debilidades = value.split(',').map(d => d.trim());
        if (debilidades.some(d => d.length < 1)) {
          throw new Error("Cada debilidad debe tener al menos 1 carácter.");
        }
        return true;
      }),

    body('aliados')
      .optional()
      .custom(value => {
        if (typeof value !== 'string') return true;
        const aliados = value.split(',').map(a => a.trim());
        if (aliados.some(a => a.length < 1)) {
          throw new Error("Cada aliado debe tener al menos 1 carácter.");
        }
        return true;
      }),

    body('enemigos')
      .optional()
      .custom(value => {
        if (typeof value !== 'string') return true;
        const enemigos = value.split(',').map(e => e.trim());
        if (enemigos.some(e => e.length < 1)) {
          throw new Error("Cada enemigo debe tener al menos 1 carácter.");
        }
        return true;
      }),

  ];
}