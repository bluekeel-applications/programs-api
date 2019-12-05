import connectToDatabase from '../db';
import Program from '../models/Program';
import Domain from '../models/Domain';

import { success, failure } from "../libs/response-lib";

export const removeProgram = async(event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const programId = event.pathParameters.program_id;
    try {
        await connectToDatabase();
        const program = await Domain.findByIdAndDelete(programId);
        return success(program);

    } catch (err) {
        console.log('Error deleting program:', err);
        return failure({ status: false });
    }
};

export const removeEndpoint = async(event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const endpointId = event.queryStringParameters.ep_id;
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
        return success(program);
    } catch (err) {
        console.log('Error deleting program endpoint:',endpointId, err);
        return failure({ status: false });
    }
};