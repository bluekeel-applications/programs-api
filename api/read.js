import connectToDatabase from '../db';
import Program from '../models/Program';
import Domain from '../models/Domain';

import { success, failure } from "../libs/response-lib";


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
        }, 'title pid domain description avatar accepts');

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
        const program = await Program.find({
            pid: data.pid,
            vars: {
                vertical: data.vars.vertical,
                loan_type: data.vars.loan_type,
                debt_type: data.vars.debt_type,
                debt_amount: data.vars.debt_amount,
                checking_optin: data.vars.checking_optin,
                debt_optin: data.vars.debt_optin,
                email_optin: data.vars.email_optin
            }
        }, '_id click_count endpoints');
        return success(program);

    } catch (err) {
        console.log('Error getting User by ID:', err);
        return failure({status: false});
    }
};

export async function getByPid(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    const reqPid = event.pathParameters.pid;
    try {
        await connectToDatabase();
        const programs = await Program.find({
            pid: reqPid
        }, '_id domain pid click_count vars endpoints');
        return success(programs);
    } catch (err) {
        console.log('Error getting vars by pid:', err);
        return failure({
            status: false
        });
    }
};