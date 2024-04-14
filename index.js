const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const dotenv = require('dotenv')
dotenv.config();


const bcrypt = require('bcrypt');

const {connect}  = require('./Repository/Database');
connect();

app.get('/',(req,res)=>{
    res.send('hello')
})

const {individualLogin, individualRegister} = require('./service/userAuthentication/IndividualAuth');

const {managementLogin,managementRegister} = require('./service/userAuthentication/ManagementAuth');

const {addExpense,getExpense} = require('./service/IndividualApi/Expense')
const {addIncome, getIncome} = require('./service/IndividualApi/Income');
const {sendSms} = require('./service/IndividualApi/Sms')
const {detectText} = require('./service/IndividualApi/TextractAI')

app.post('/register', async(req,res)=>{
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const result = await individualRegister(
        req.body.username,
        req.body.mobileNo,
        hashPassword,
        req.body.email,
        process.env.secretKeyForJwt,
    )
    res.send(result);
});

app.post('/login',async(req,res)=>{
    const result = await individualLogin(
        req.body.mobileNo,
        req.body.password,
        process.env.secretKeyForJwt,
    );
    res.send(result);
});


app.post('/register-management', async(req,res)=>{
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const result = await managementRegister(
        req.body.username,
        req.body.mobileNo,
        hashPassword,
        req.body.email,
        process.env.secretKeyForJwt,
    );
    res.send(result);
})

app.post('/login-management',async(req,res)=>{
    const result = await managementLogin(
        req.body.mobileNo,
        req.body.password,  
        process.env.secretKeyForJwt,
    )
    res.send(result);
})



app.post('/add-expense', async(req,res)=>{
    const result = await addExpense(
        req.body.userId,
        req.body.category,
        req.body.product_name,
        req.body.product_amount,
        req.body.description,
        req.body.date,
    )
    res.send(result);
})

app.get('/get-expenses', async(req,res)=>{
    const result = await getExpense(req.query.userId);
    res.send({result});
})

app.post('/add-income', async(req,res)=>{
    const result = await addIncome(
        req.body.userId,
        req.body.source,
        req.body.amount,
        req.body.description,
        req.body.date,
    );
    res.send(result);
})

app.get('/get-income', async(req,res)=>{
    const result = await getIncome(
        req.query.userId,
    )
    res.send(result.res.incomes);
})

app.post('/send-sms',async(req,res)=>{
    const result = await sendSms(
        req.body.minIncome,
        req.body.maxExpense,
        req.body.phone_number
    )
    res.send(result)
})

app.post('/analyze-document', async (req, res) => {
    console.log("document");
    const { image } = req.body;
    const imageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  
    try {
      const result = await detectText(imageBuffer)
      res.send(result);
    } catch (error) {
      console.error('Error analyzing document:', error);
      res.status(500).json({ error: 'An error occurred while analyzing the document' });
    }
  });

  
app.listen(process.env.PORT,(req,res)=>{
    console.log(`server running on port ${process.env.PORT}`);
} );