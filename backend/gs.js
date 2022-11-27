import twilio from 'twilio';

const accountsid = 'AC8bca26b451c3fd1709a36e5c85e5e0ea';
const authtoken = '290be7dbb8cfc99a46959c3ec5588a7c';

const client = new twilio(accountsid, authtoken);
export default client;
    

