import connectToDatabase from '../db';
import Program from '../models/Program';
// import Domain from '../models/Domain';

import { failure, success } from "../libs/response-lib";

export const endpointUrl = async(event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const endpointId = event.queryStringParameters.ep_id;
    const programId = event.pathParameters.program_id;
    const data = JSON.parse(event.body);
    try {
        await connectToDatabase();
        let program;
        program = await Program.findById(programId);
        if (!program) {
            throw new Error('There is no Program found with ID:', programId);
        }
        program.endpoints.id(endpointId).url = data.url;
        program.save((err) => {
            if (err) return failure({ status: false,body: err });
            console.log('Endpoint updated successfully to:', data.url);
        });
        return success(program.endpoints.id(endpointId));

    } catch (err) {
        console.log('Error getting Program:', err);
        return failure({ status: false });
    }
};

export const programEndpoints = async(event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const programId = event.pathParameters.program_id;
    const data = JSON.parse(event.body);
    try {
        await connectToDatabase();
        let program;
        program = await Program.findById(programId);
        if (!program) {
            throw new Error('There is no Program found with ID:', programId);
        }
        program.endpoints = data;
        program.save((err) => {
            if (err) return failure({ status: false,body: err });
            console.log('Endpoint updated successfully to Program');
        });
        return success(program);

    } catch (err) {
        console.log('Error getting Program:', err);
        return failure({ status: false });
    }
};