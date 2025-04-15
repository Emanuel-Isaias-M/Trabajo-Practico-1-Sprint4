import express from 'express';
import { connectDB } from path.join(__dirname, 'config', 'dbconfig.mjs');
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import expressLayouts from 'express-ejs-layouts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuración de EJS y layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // usa views/layout.ejs

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rutas HTML normales
app.get('/', (req, res) => {
  res.render('index', { title: 'Página principal' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'Acerca de' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contacto' });
});

// Rutas de la API
app.use('/api', superHeroRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).send({ mensaje: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
