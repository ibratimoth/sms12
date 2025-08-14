const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const logger = require('./logger');
const cookieParser = require('cookie-parser');
const { connectionDB } = require("./config/db");
const configureSession = require('./middlewares/sessionConfig');
const academicRoutes = require("./routes/academicRoutes");
const yearRoutes = require('./routes/yearRoute')
const classRoutes = require('./routes/classRoutes')
const streamRoutes = require('./routes/streamRoutes')
const studentRoutes = require('./routes/studentRoutes')
const subjectRoutes = require('./routes/subjectRoutes')
const termRoutes = require('./routes/termRoutes')
const assessmentRoutes = require('./routes/assessmentRoutes')
const examinationRoutes = require('./routes/examinationRoutes')
dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
configureSession(app);

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.get('/record', (req, res) => {
  const email = req.session.staffEmail || '';
  const lastname = req.session.lastname || '';
  res.render('recordView', { email, lastname });
})

app.get('/', (req, res) => {
  return res.render('login');
});

app.get('/Home', (req, res) => {
  return res.render('index');
});

app.get('/table', (req, res) => {
  const email = req.session.staffEmail || '';
  const lastname = req.session.lastname || '';
  return res.render('table', { email, lastname });
});

app.get('/view', (req, res) => {
  const email = req.session.staffEmail || '';
  const lastname = req.session.lastname || '';
  return res.render('viewattendance', { email, lastname });
});

app.get('/session-data', (req, res) => {
  res.json(req.session);
});

app.get('/cookie-data', (req, res) => {
  res.json(req.cookies);
});

app.get('/staff', (req, res) => {
  const email = req.session.staffEmail || '';
  const lastname = req.session.lastname || '';
  return res.render('staff', { email, lastname });
});

app.use('/api', academicRoutes);
app.use('/year', yearRoutes)
app.use('/class', classRoutes)
app.use('/stream', streamRoutes)
app.use('/student', studentRoutes)
app.use('/subject', subjectRoutes)
app.use('/term', termRoutes)
app.use('/assessment', assessmentRoutes)
app.use('/examination', examinationRoutes)

const PORT = process.env.PORT || 3006;

const server = app.listen(PORT, () => {
  logger.info(`Successfully connected to the server url http://localhost:${PORT}`);
});

module.exports = server;
connectionDB();