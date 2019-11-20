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
        return failure({
            status: false
        });
    }
};