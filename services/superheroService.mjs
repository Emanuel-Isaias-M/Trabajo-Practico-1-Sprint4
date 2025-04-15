import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";
//utiliza los metodos del repositorio para buscar , filtrar, etc
 //separa los metodos del repositorio con el fin de que este solo se ocupe de la base de datos
export async function obtenerSuperheroesPorId(id) {
    return await SuperHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
    return await SuperHeroRepository.obtenerTodos();
}

export async function obtenerSuperheroesPorAtributo(atributo, valor) {
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
    return await SuperHeroRepository.obtenerMayoresDe30();
    }

export async function crearSuperheroe(datosSuperheroe) {
    return await SuperHeroRepository.insertarSuperheroe(datosSuperheroe);
    }
 
    export async function actualizarSuperheroe(id, nuevosDatos) {
        return await SuperHeroRepository.actualizarSuperheroe(id, nuevosDatos);
    }

    export async function borrarSuperheroePorNombre(nombreSuperHeroe) {
        return await SuperHeroRepository.borrarPorNombre(nombreSuperHeroe);
    }
    export async function borrarSuperheroePorId(id) {
        return await SuperHeroRepository.borrarPorId(id);
    }