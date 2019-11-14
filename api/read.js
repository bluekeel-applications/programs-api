import connectToDatabase from '../db';
import Program from '../models/Program';
import {
    success,
    failure
} from "../libs/response-lib";


export async function getAllEndpoints(context) {
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
}

export async function getOneProgram(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectToDatabase();
        let queryObj = {
            domain: event.pathParameters.dm,
            vars: {
                media_type: event.pathParameters.mt,
                vertical: event.pathParameters.vt,
                loan_type: event.pathParameters.lt,
                debt_type: event.pathParameters.dt,
                debt_amount: event.pathParameters.da,
                checking_optin: event.pathParameters.co,
                debt_optin: event.pathParameters.do,
                email_optin: event.pathParameters.eo
            }
        };

        const program = await Program.findOne(queryObj, 'endpoints');
        return success(program);

    } catch (err) {
        console.log('Error getting User by ID:', err);
        return failure({status: false});
    }
}