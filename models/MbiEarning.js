const mongoose=require('mongoose');

const EarningsSchema =mongoose.Schema({
    Total:{
        type:Number,
        default:30
        }
    });


 const Earnings = mongoose.model('Earnings', EarningsSchema);

 module.exports=Earnings;

