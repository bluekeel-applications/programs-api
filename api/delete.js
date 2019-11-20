import connectToDatabase from '../db';
import Program from '../models/Program';
import { success, failure } from "../libs/response-lib";

export const removeProgram = async(event, context) => {
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
};

export const removeEndpoint = async(event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const endpointId = event.pathParameters.endpoint_id;
    const programId = event.pathParameters.program_id;
    try {
        await connectToDatabase();
        let program;
        //Check if program exists in DB; error out in not
        program = await Program.findById(programId, '_id endpoints click_count');
        if (!program) {
            throw new Error('There is no Program found with ID:', programId);
        }
        program.endpoints.pull(endpointId);
        program.save((err) => {
            if(err) return failure({ status: false, body: err });
            console.log('Endpoint: ' + endpointId + ' removed successfully');
        });

    } catch (err) {
        console.log('Error deleting program endpoint:',endpointId, err);
        return failure({ status: false });
    }
};