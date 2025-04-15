import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';
//implementa metodos definidos en la interfaz

class SuperHeroRepository extends IRepository{

    async obtenerPorId(id){
        return await SuperHero.findById(id);
    }

    async obtenerTodos(){
        return await SuperHero.find ({});
    }

    async buscarPorAtributo(atributo, valor){
      return await SuperHero.find({ [atributo]: valor });
    }

    async obtenerMayoresDe30() {
        return await SuperHero.find( { $and : [
            { edad : { $gt : 30 } },
            { planetaOrigen : "Tierra" },
            { $expr: { $gt: [{ $size: "$poderes" }, 2] } } 
        ] } );
        
    }

    async insertarSuperheroe(nuevoSuperheroe) {
        const superheroe = new SuperHero(nuevoSuperheroe);
        return await superheroe.save();
    }

    async actualizarSuperheroe(id,datosActualizados) {
        const {nombreSuperHeroe,nombreReal,edad,planetaOrigen,debilidad,poderes,aliados,enemigos,creador} = datosActualizados;
        const superheroe = await SuperHero.findOneAndUpdate(

        { _id: id }, 

        { $set: { nombreSuperHeroe:nombreSuperHeroe,nombreReal:nombreReal,edad:edad,planetaOrigen:planetaOrigen,debilidad:debilidad,poderes:poderes,aliados:aliados,enemigos:enemigos,creador:creador} },

        { new: true }

      )

      return superheroe; 
}
       

    async borrarPorNombre(nombreSuperHeroe) {
            return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombreSuperHeroe });
           }
       
           async borrarPorId(id) {
            return await SuperHero.findByIdAndDelete(id);
           }
       
       
        }
    
        export default new SuperHeroRepository;