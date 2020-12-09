// npm init  -- npm install express --save  ---npm install ejs --save ---npm install body-parser -S

const express = require('express');
const path = require('path');                                     // untuk gabungin peth ('/') mengkondisikan dg kondisi OS
const bodyParser = require('body-parser')
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));


const app = express()                                             // untuk memanggil express

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'))                    // seperti pwd tujuannya mencari posisi folder "views" otomatis dan wajib
app.set('view engine', 'ejs')                                     // memberi tahu bahwa file yg dikirim berupa ejs

app.use('/', express.static(path.join(__dirname, 'public')))      //untuk menyimpan file seperti foto dll, di folder publice

app.get('/', (req, res) => res.render('list', { data }))

app.get('/add', (req, res) => res.render('add'))
app.post('/add', (req, res) => {
  data.push({ string: req.body.string, integer: parseInt(req.body.integer), float: parseFloat(req.body.float), date: req.body.date, boolean: JSON.parse(req.body.boolean) })
  fs.writeFileSync('data.json', JSON.stringify(data, null, 1));
  res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
  data.splice(req.params.id, 1)
  fs.writeFileSync('data.json', JSON.stringify(data, null, 1));
  res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
   res.render('edit', { item: data[id] })
})

app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  data[id] = { string: req.body.string, integer: parseInt(req.body.integer), float: parseFloat(req.body.float), date: req.body.date, boolean: JSON.parse(req.body.boolean) };
  fs.writeFileSync('data.json', JSON.stringify(data, null, 1));
  res.redirect('/');
}) 

app.listen(3000, () => {
  console.log('Web ini berjalan di port 3000')
})