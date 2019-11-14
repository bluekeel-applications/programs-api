import connectToDatabase from '../db';
import Program from '../models/Program';
import {
    success,
    failure
} from "../libs/response-lib";


export async function getAllEndpoints(context) {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectToDatabase();
        const endpoints = await Program.find({
            endpoints: { $exists: true }
        });

        return success(endpoints);
    } catch (err) {
        console.log('Error getting all users:', err);
        return failure({
            status: false
        });
    }
}

// export async function getOne(event, context) {
//     context.callbackWaitsForEmptyEventLoop = false;
//     try {
//         await connectToDatabase();
//         const user = await User.findById(event.pathParameters.id);
//         return success(user);
//     } catch (err) {
//         console.log('Error getting User by ID:', err);
//         return failure({
//             status: false
//         });
//     }
// }