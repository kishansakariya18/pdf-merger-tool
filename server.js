const express = require('express')
const app = express();
const multer  = require('multer');
const {mergePdfs} = require('./merge');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const port = 3000;
app.use('/static', express.static('public'))



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/templates/index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  const file1 = path.join(__dirname , req.files[0].path);
  const file2 = path.join(__dirname , req.files[1].path);
  console.log(req.files);
  const d = await mergePdfs(file1 , file2);
  res.redirect(`http://localhost:3000/static/${d}.pdf`);
  // res.send({data : req.files});
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
});



app.listen(port, () => {
  console.log(`Example app listening on port http//localhost:${port}`);
})