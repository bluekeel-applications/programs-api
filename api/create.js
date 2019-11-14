import connectToDatabase from '../db';
import User from '../models/Program';
import { success, failure } from "../libs/response-lib";

export async function newEndpoint(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);

    try {
        await connectToDatabase();
        const response = await User.create(data);
        return success(response);
    } catch (err) {
        console.log('Error creating new Program Endpoint:', err);
        return failure({ status: false });
    }
}