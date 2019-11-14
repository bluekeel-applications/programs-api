import connectToDatabase from '../db';
import Program from '../models/Program';
import { success, failure } from "../libs/response-lib";

export async function removeProgram(event, context) {
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

        const program = await Program.findOneAndDelete(queryObj);
        return success(program);

    } catch (err) {
        console.log('Error deleting program:', err);
        return failure({ status: false });
    }
}