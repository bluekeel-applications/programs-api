import connectToDatabase from '../db';
import Program from '../models/Program';
import Domain from '../models/Domain';

import { success, failure } from "../libs/response-lib";

export const newDomain = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);

    try {
        await connectToDatabase();
        const response = await Domain.create(data);
        return success(response);

    } catch (err) {
        console.log('Error creating new Domain:', err);
        return failure({ status: false });
    }
};

export const newProgram = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);

    try {
        await connectToDatabase();
        const response = await Program.create(data);
        return success(response);
    } catch (err) {
        console.log('Error creating new Program:', err);
        return failure({ status: false });
    }
};