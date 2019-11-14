import connectToDatabase from '../db';
import Program from '../models/Program';
import { success, failure } from "../libs/response-lib";

export async function removeProgram(event, context) {
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

        const program = await Program.findOneAndDelete(queryObj);
        return success(program);

    } catch (err) {
        console.log('Error deleting program:', err);
        return failure({ status: false });
    }
}