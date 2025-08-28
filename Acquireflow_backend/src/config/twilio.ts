import twilio from 'twilio';
import { config } from './env';

// Initialize Twilio client
const initializeTwilio = () => {
  try {
    const client = twilio(config.twilio.accountSid, config.twilio.authToken);
    console.log('Twilio client initialized successfully');
    return client;
  } catch (error) {
    console.error('Error initializing Twilio client:', error);
    throw error;
  }
};

// Get Twilio client instance
export const getTwilioClient = () => {
  return initializeTwilio();
};

// Send SMS message
export const sendSMS = async (
  to: string,
  body: string,
  from?: string
): Promise<any> => {
  try {
    const client = getTwilioClient();
    const message = await client.messages.create({
      body,
      from: from || config.twilio.phoneNumber,
      to,
    });
    
    console.log(`SMS sent successfully to ${to}. SID: ${message.sid}`);
    return message;
  } catch (error) {
    console.error(`Error sending SMS to ${to}:`, error);
    throw error;
  }
};

// Send bulk SMS messages
export const sendBulkSMS = async (
  recipients: string[],
  body: string,
  from?: string
): Promise<any[]> => {
  try {
    const client = getTwilioClient();
    const promises = recipients.map(to => 
      client.messages.create({
        body,
        from: from || config.twilio.phoneNumber,
        to,
      })
    );
    
    const messages = await Promise.all(promises);
    console.log(`Bulk SMS sent successfully to ${recipients.length} recipients`);
    return messages;
  } catch (error) {
    console.error('Error sending bulk SMS:', error);
    throw error;
  }
};

// Verify phone number
export const verifyPhoneNumber = async (
  phoneNumber: string
): Promise<boolean> => {
  try {
    const client = getTwilioClient();
    const lookup = await client.lookups.v2.phoneNumbers(phoneNumber).fetch();
    
    return !!lookup.valid;
  } catch (error) {
    console.error(`Error verifying phone number ${phoneNumber}:`, error);
    return false;
  }
};

// Get phone number information
export const getPhoneNumberInfo = async (
  phoneNumber: string
) => {
  try {
    const client = getTwilioClient();
    const lookup = await client.lookups.v2.phoneNumbers(phoneNumber).fetch({
      fields: 'caller_name,line_type_intelligence,sim_swap,call_forwarding',
    });
    
    return lookup;
  } catch (error) {
    console.error(`Error getting phone number info for ${phoneNumber}:`, error);
    throw error;
  }
};

export default {
  initializeTwilio,
  getTwilioClient,
  sendSMS,
  sendBulkSMS,
  verifyPhoneNumber,
  getPhoneNumberInfo,
};
