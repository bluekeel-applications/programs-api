import connectToDatabase from '../db';
import Program from '../models/Program';
import {
    success,
    failure
} from "../libs/response-lib";


export async function getAllPrograms(context) {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectToDatabase();
        const endpoints = await Program.find({
            endpoints: { $exists: true }
        });

        return success(endpoints);
    } catch (err) {
        console.log('Error getting all users:', err);
        return failure({
            status: false
        });
    }
};

export async function getDomainList(context) {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectToDatabase();
        const domains = await Program.find({
            domain: { $exists: true }
        }, 'title domain description avatar');

        return success(domains);
    } catch (err) {
        console.log('Error getting list of domains:', err);
        return failure({
            status: false
        });
    }
};

export async function getOneProgram(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);

    try {
        await connectToDatabase();
        let queryObj = {
            domain: data.domain,
            vars: {
                media_type: data.vars.media_type,
                vertical: data.vars.vertical,
                loan_type: data.vars.loan_type,
                debt_type: data.vars.debt_type,
                debt_amount: data.vars.debt_amount,
                checking_optin: data.vars.checking_optin,
                debt_optin: data.vars.debt_optin,
                email_optin: data.vars.email_optin
            }
        };
        const program = await Program.findOne(queryObj, 'endpoints');
        return success(program);

    } catch (err) {
        console.log('Error getting User by ID:', err);
        return failure({status: false});
    }
}