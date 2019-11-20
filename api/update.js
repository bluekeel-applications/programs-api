import connectToDatabase from '../db';
import Program from '../models/Program';
// import Domain from '../models/Domain';

import { failure, buildQueryObj, success } from "../libs/response-lib";

export const endpoints = async(event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    try {
        await connectToDatabase();
        let queryObj = buildQueryObj(data);
        let newEndpoint = {
            url: data.new_endpoint,
            usage: 0
        };
        let program;
        //Check if program exists in DB; make one if not
        program = await Program.findOne(queryObj, '_id endpoints click_count');
        if(!program) {
            const endpointField = { endpoints:[] };
            const newProgram = Object.assign(queryObj, endpointField);
            program = await Program.create(newProgram);
        }
        //Grab endpoint list
        let programEndpoints = program.endpoints;
        //Add new endpoint to list
        programEndpoints.push(newEndpoint);
        //Update the list on the document
        program.endpoints = programEndpoints;
        //Save changes to document
        const res = await program.save();
        return success(res);

    } catch (err) {
        console.log('Error getting Program:', err);
        return failure({ status: false });
    }
};

export const endpointUrl = async(event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const endpointId = event.queryStringParameters.ep_id;
    const programId = event.pathParameters.program_id;
    const data = JSON.parse(event.body);
    try {
        await connectToDatabase();
        let program;
        // Double-Check if program exists in DB; error out in not
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