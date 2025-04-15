import { obtenerSuperheroesPorId,obtenerTodosLosSuperheroes, obtenerSuperheroesPorAtributo,
  obtenerSuperheroesMayoresDe30, crearSuperheroe, actualizarSuperheroe, borrarSuperheroePorId, borrarSuperheroePorNombre } from "../services/superheroService.mjs";
import { renderizarSuperheroe, renderizarListaSuperheroes } from "../views/responseView.mjs";


// ✅ Obtener todos los superhéroes
export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
      const superheroes = await obtenerTodosLosSuperheroes();
      res.render('dashboard', {
        title: 'Dashboard de Superhéroes',
        superheroes
      });
    } catch (error) {
      res.status(500).send({
        mensaje: 'Error al obtener los superhéroes',
        error: error.message
      });
    }
  }
  
  // ✅ Obtener superhéroe por ID (JSON)
  export async function obtenerSuperheroePorIdController(req, res) {
    try {
      const { id } = req.params;
      const superheroe = await obtenerSuperheroesPorId(id);
      if (!superheroe)
        return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
  
      const superheroeFormateado = renderizarSuperheroe(superheroe);
      res.status(200).json(superheroeFormateado);
    } catch (error) {
      res.status(500).send({
        mensaje: 'Error al obtener el superhéroe',
        error: error.message
      });
    }
  }
  
  // ✅ Buscar por atributo (JSON)
  export async function obtenerSuperheroesPorAtributoController(req, res) {
    try {
      const { atributo, valor } = req.params;
      const superheroes = await obtenerSuperheroesPorAtributo(atributo, valor);
      if (superheroes.length === 0)
        return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
  
      const superheroesFormateados = renderizarListaSuperheroes(superheroes);
      res.status(200).json(superheroesFormateados);
    } catch (error) {
      res.status(500).send({
        mensaje: 'Error al buscar los superhéroes',
        error: error.message
      });
    }
  }
  
  // ✅ Superhéroes mayores de 30 (JSON)
  export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
      const superheroes = await obtenerSuperheroesMayoresDe30();
      if (superheroes.length === 0)
        return res.status(404).send({ mensaje: 'No se encontraron superhéroes mayores de 30 años' });
  
      const superheroesFormateados = renderizarListaSuperheroes(superheroes);
      res.status(200).json(superheroesFormateados);
    } catch (error) {
      res.status(500).send({
        mensaje: 'Error al obtener los superhéroes mayores de 30',
        error: error.message
      });
    }
  }
  
  // ✅ Crear superhéroe
  export async function crearSuperheroeController(req, res) {
    try {
      const datosSuperheroe = {
        ...req.body,
        poderes: req.body.poderes?.split(',').map(p => p.trim()).filter(p => p !== ''),
        debilidad: req.body.debilidad?.split(',').map(d => d.trim()).filter(d => d !== ''),
        aliados: req.body.aliados?.split(',').map(a => a.trim()).filter(a => a !== ''),
        enemigos: req.body.enemigos?.split(',').map(e => e.trim()).filter(e => e !== ''),
        creador: req.body.creador?.split(',').map(c => c.trim()).filter(c => c !== '')
      };
  
      if (!datosSuperheroe.nombreSuperHeroe || !datosSuperheroe.nombreReal) {
        return res.status(400).send({
          mensaje: "El nombre del superhéroe y el nombre real son obligatorios"
        });
      }
  
      await crearSuperheroe(datosSuperheroe);
      res.redirect('/api/dashboard');
    } catch (error) {
      res.status(500).send({
        mensaje: "Error al crear el superhéroe",
        error: error.message
      });
    }
  }
  
  // ✅ Actualizar superhéroe
  export async function actualizarSuperheroeController(req, res) {
    try {
      const { id } = req.params;
      const nuevosDatos = req.body;
      await actualizarSuperheroe(id, nuevosDatos);
      res.redirect('/api/dashboard');
    } catch (error) {
      res.status(500).send({
        mensaje: 'Superhéroe con ID incorrecto o inexistente',
        error: error.message
      });
    }
  }
  
  // ✅ Borrar por nombre (JSON)
  export async function borrarSuperheroePorNombreController(req, res) {
    const { nombreSuperHeroe } = req.params;
  
    try {
      const superheroeBorrado = await borrarSuperheroePorNombre(nombreSuperHeroe);
      if (!superheroeBorrado) {
        return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
      }
  
      res.status(200).json(superheroeBorrado);
    } catch (error) {
      res.status(500).send({
        mensaje: 'Error al borrar el superhéroe',
        error: error.message
      });
    }
  }
  
  // ✅ Borrar por ID (redirect)
  export async function borrarSuperheroeIdController(req, res) {
    const { id } = req.params;
  
    try {
      const superheroeBorrado = await borrarSuperheroePorId(id);
      if (!superheroeBorrado) {
        return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
      }
  
      res.redirect('/api/heroes');
    } catch (error) {
      res.status(500).send({
        mensaje: 'Error al borrar el superhéroe',
        error: error.message
      });
    }
  }
  
  // ✅ Renderizar formulario de edición
  export const modificarSuperheroeFormularioController = async (req, res) => {
    try {
      const { id } = req.params;
      const superheroeaEditar = await obtenerSuperheroesPorId(id);
  
      res.render('editSuperhero', {
        title: 'Editar Superhéroe',
        superheroeaEditar
      });
    } catch (error) {
      res.status(500).send({
        mensaje: 'Error al cargar formulario',
        error: error.message
      });
    }
  };
  