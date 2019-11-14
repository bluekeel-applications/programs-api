import connectToDatabase from '../db';
import Program from '../models/Program';
import { success, failure } from "../libs/response-lib";

export async function newProgram(event, context) {
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
}