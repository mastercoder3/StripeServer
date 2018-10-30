const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let stripe = require('stripe')('sk_test_OFknQLeeYOEkE2pw0aUtk0Jo');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

router.route('/payments').post((req, res) => {
    console.log(req.body)
    let amount = req.body.amount;
    console.log(amount);
    let token = req.body.token;
    console.log(token);
   let id = token.id;
    stripe.charges.create({
        amount: String(amount),
        currency: 'dkk',
        description: 'Tracking Live Payment Transaction',
        source: id
  
}, (err, charge)=>{
    if(err){ 
        let sent={data:err.message, success:false};
        console.log(sent);
       res.json(sent);
    }
    else{ 
        let sentx={data:charge, success:true}
        console.log(sentx);
        res.json(sentx);
      }
}).catch(ERR=>{ 
    console.log(ERR.message);})

});


app.use('/', router);



//server running
app.listen(3000, ()=> console.log("Express server running"));