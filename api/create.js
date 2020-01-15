import connectToDatabase from '../db';
import Program from '../models/Program';
import Domain from '../models/Domain';

import { success, buildQueryObj, failure } from "../libs/response-lib";

export const newDomain = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);

    try {
        await connectToDatabase();
        const response = await Domain.create(data);
        return success(response);

    } catch (err) {
        console.log('Error creating new Program Domain:', err);
        return failure({ status: false });
    }
};

export const newProgram = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    let queryObj = buildQueryObj(data);
    try {
        await connectToDatabase();
        let program = await Program.findOneAndUpdate(queryObj, data, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        });
        return success(program);

    } catch (err) {
        console.log('Error creating new Program:', err);
        return failure({ status: false, body: err });
    }
};

export const endpoint = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    const { name, url, jump, usage, offer_page, four_button } = data.new_endpoint;
    try {
        await connectToDatabase();
        let queryObj = buildQueryObj(data);
        let newEndpoint = {
            name,
            url,
            jump: jump || 'N/A',
            usage: usage || 0,
            offer_page: offer_page || 'wall',
            four_button: four_button || ['N/A']
        };
        //Check if program exists in DB; make one if not
        let program = await Program.findOne(queryObj, '_id endpoints click_count');
        if (!program) {
            const endpointField = {
                endpoints: []
            };
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
        await program.save((err) => {
            if (err) return failure({
                status: false,
                body: err
            });
            console.log('Endpoint updated successfully to Program');
        });
        return success(program);

    } catch (err) {
        console.log('Error getting Program:', err);
        return failure({
            status: false,
            body: err
        });
    }
};