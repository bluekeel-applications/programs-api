import connectToDatabase from '../db';
import Program from '../models/Program';
import Domain from '../models/Domain';

import { failure, success } from "../libs/response-lib";

export const endpoint = async(event, context) => {
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
        program.endpoints.id(endpointId).name = data.name;
        program.save((err) => {
            if (err) return failure({ status: false,body: err });
            console.log('Endpoint updated successfully for:', data.name);
        });
        return success(program.endpoints);

    } catch (err) {
        console.log('Error updating endpoint:', err);
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

export const programDomain = async(event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const programId = event.pathParameters.program_id;
    const data = JSON.parse(event.body);
    try {
        await connectToDatabase();
        let program;
        program = await Domain.findById(programId);
        if (!program) {
            throw new Error('There is no Program found with ID:', programId);
        }
        program.title = data.name_value || 'N/A';
        program.pid = data.pid_value || 1;
        program.domain = data.domain_value || 'N/A';
        program.description = data.description_value || 'N/A';
        program.avatar = data.avatar_src || 'N/A';
        program.accepts = data.accepts || [];
        program.save((err) => {
            if (err) return failure({ status: false,body: err });
            console.log('Program updated successfully');
        });
        return success(program);

    } catch (err) {
        console.log('Error getting Program:', err);
        return failure({ status: false });
    }
};