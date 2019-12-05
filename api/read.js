import connectToDatabase from '../db';
import Program from '../models/Program';
import Domain from '../models/Domain';

import { success, failure, buildQueryObj } from "../libs/response-lib";


export async function getAllEndpoints(context) {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectToDatabase();
        const endpoints = await Program.find({
            endpoints: { $exists: true }
        }, 'endpoints');

        return success(endpoints);
    } catch (err) {
        console.log('Error getting all endpoints:', err);
        return failure({
            status: false
        });
    }
};

export async function getAllDomains(context) {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectToDatabase();
        const domains = await Domain.find({
            domain: { $exists: true }
        }, 'title domain description avatar');

        return success(domains);
    } catch (err) {
        console.log('Error getting list of domains:', err);
        return failure({
            status: false
        });
    }
};

export async function getOneProgram(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);

    try {
        await connectToDatabase();
        let queryObj = buildQueryObj(data);
        const program = await Program.findOne(queryObj, '_id endpoints click_count');
        return success(program);

    } catch (err) {
        console.log('Error getting User by ID:', err);
        return failure({status: false});
    }
};

export async function getListByDomain(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    const reqData = JSON.parse(event.body);
    const domainName = reqData.domain;
    try {
        await connectToDatabase();
        const programs = await Program.find({
            domain: domainName
        });
        return success(programs);
    } catch (err) {
        console.log('Error getting list by:', err);
        return failure({
            status: false
        });
    }
};