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
        if(!domains) { throw new Error({ message: 'Error occurred getting program domains.' }); };
        return success(domains);
    } catch (err) {
        console.log('Error getting list of domains:', err);
        return failure({
            status: false,
            body: err
        });
    }
};

export async function getOneProgram(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    try {
        await connectToDatabase();
        const program = await Program.find({
            domain: data.domain,
            pid: { $all: data.pid },
            vars: {
                vertical: data.vars.vertical,
                loan_type: data.vars.loan_type,
                debt_type: data.vars.debt_type,
                debt_amount: data.vars.debt_amount
            }
        }, '_id click_count endpoints');
        if(!program) { throw new Error({ message: 'Error occurred getting program.' }); };

        return success(program);
    } catch (err) {
        console.log('Error getting User by ID:', err);
        return failure({
            status: false,
            body: err
        });
    }
};

export async function getProgramOffers(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    try {
        await connectToDatabase();
        const program = await Program.find({
            'pid': { $all: [data.pid] },
            'vars.vertical': data.vertical,
            'vars.loan_type': data.loan_type,
            'vars.debt_type': data.debt_type,
            'vars.debt_amount': data.debt_amount
        }, '_id click_count endpoints');
        if(!program) { throw new Error({ message: 'Error occurred getting program offers.' }); };
        return success(program);
    } catch (err) {
        console.log('Error getting Program Offers:', err);
        return failure({
            status: false,
            body: err
        });
    }
};

export async function getByPid(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    const reqPid = event.pathParameters.pid;
    try {
        await connectToDatabase();
        const programs = await Program.find({
            pid: { $all: [reqPid] }
        }, '_id domain pid click_count vars endpoints');
        if(!programs) { throw new Error({ message: 'Error occurred getting program by pid.' }); };
        return success(programs);
    } catch (err) {
        console.log('Error getting vars by pid:', err);
        return failure({
            status: false,
            body: err
        });
    }
};

export async function getByPidVertical(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    const reqPid = event.pathParameters.pid;
    const reqVertical = event.pathParameters.vertical;
    try {
        await connectToDatabase();
        const programs = await Program.find({ pid: { $all: [reqPid] } });
        if(!programs) { throw new Error({ message: `Error occurred getting programs for pid: ${reqPid}` }); };
        const programVerticals = programs.map((program) => {
            if(program.vars.vertical === reqVertical && program.endpoints.length > 0) {
                return program;
            };
        });
        const filteredProgramVerticals = programVerticals.filter((item) => {
            return item != null;
        });
        return success(filteredProgramVerticals);
    } catch (err) {
        console.log('Error getting vars by pid:', err);
        return failure({
            status: false,
            body: err
        });
    }
};

export async function getByPost(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    try {
        await connectToDatabase();
        const programs = await Program.find({ pid: { $all: data.pid } });
        if(!programs) { throw new Error({ message: `Error occurred getting programs for pid: ${data.pid}` }); };
        const programVerticals = programs.map((program) => {
            if(program.vars.vertical === data.vertical && program.endpoints.length > 0) {
                return program;
            };
        });
        const filteredProgramVerticals = programVerticals.filter((item) => {
            return item != null;
        });
        return success(filteredProgramVerticals);
    } catch (err) {
        console.log('Error getting vars by pid:', err);
        return failure({
            status: false,
            body: err
        });
    }
};