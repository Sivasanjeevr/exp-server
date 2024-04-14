const axios = require('axios');

const sendSms = async (minIncome, maxExpense, phone_number) => {
    try {
        let message = `Message from Spendy an expense tracker ,\nMinimum Income - ${20000} - Salary\nMaximum Expense - ${2500} - Clothing`;
        console.log(phone_number);
        
        
        const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.fast2smsKey}&message=${encodeURIComponent(message)}&language=english&route=q&numbers=${phone_number}`;

       
        const response = await axios.get(url);

        console.log(response.data);

        if (response && response.data.return === true) {
            return { status: "success" };
        } else {
            return { status: "error", message: "Failed to send SMS" };
        }
    } catch (error) {
        console.error("Error sending SMS:", error);
        return { status: "error", message: "Failed to send SMS" };
    }
}

module.exports = { sendSms };
