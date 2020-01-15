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
        program.endpoints.id(endpointId).url = data.url || 'N/A';
        program.endpoints.id(endpointId).name = data.name || 'N/A';
        program.endpoints.id(endpointId).usage = data.usage || 0;
        program.endpoints.id(endpointId).jump = data.jump || 'N/A';
        program.endpoints.id(endpointId).offer_page = data.offer_page || 'wall';
        program.endpoints.id(endpointId).four_button = data.four_button || ['N/A'];
        program.save((err) => {
            if (err) return failure({ status: false, body: err });
            console.log('Endpoint updated successfully for:', data.name);
        });
        return success(program.endpoints);

    } catch (err) {
        console.log('Error updating endpoint:', err);
        return failure({ status: false, body: err });
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
        return failure({ status: false, body: err });
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
        return failure({ status: false, body: err });
    }
};

export const programClickCount = async(event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const programId = event.pathParameters.program_id;
    try {
        await connectToDatabase();
        let program = await Program.findById(programId);
        if (!program) {
            throw new Error('There is no Program found with ID:', programId);
        }
        program.click_count += 1;
        program.save((err) => {
            if (err) return failure({ status: false, body: err });
            console.log('Program updated successfully');
        });
        return success(program);

    } catch (err) {
        console.log('Error adding to Program click count:', err);
        return failure({ status: false, body: err });
    }
};