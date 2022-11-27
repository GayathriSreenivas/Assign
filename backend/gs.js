import twilio from 'twilio';

const accountsid = 'your-twilio-auth-id';
const authtoken = '<your-twilio-auth-token>';

const client = new twilio(accountsid, authtoken);
export default client;
    

