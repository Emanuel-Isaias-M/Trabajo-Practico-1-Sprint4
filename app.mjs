import express from 'express'
import path from 'path'
import expressLayouts from 'express-ejs-layouts'

const app = express()
const port = 3000;



app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'));

app.use(expressLayouts)
app.set('layout', 'layout') 


app.use(express.static(path.resolve('./public')));


app.get('/', (req, res) => {
    res.render('index', { title: 'página principal' })
})

// ruta para "about"
app.get('/about', (req, res) => {
    res.render('about', { title: 'acerca de' })
})

// ruta para "contact"
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'contacto' })
})

// iniciar el servidor
app.listen(port, () => {
    console.log(`servidor ejecutandose en: http://localhost:${port}`)
})