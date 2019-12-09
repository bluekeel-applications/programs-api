export function success(body) {
    return buildResponse(200, body);
};

export function failure(body) {
    return buildResponse(500, body);
};

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(body)
    };
};

export const buildQueryObj = (data) => {
    return {
        domain: data.domain,
        pid: data.pid,
        vars: {
            media_type: data.vars.media_type,
            vertical: data.vars.vertical,
            loan_type: data.vars.loan_type,
            debt_type: data.vars.debt_type,
            debt_amount: data.vars.debt_amount,
            checking_optin: data.vars.checking_optin,
            debt_optin: data.vars.debt_optin,
            email_optin: data.vars.email_optin
        }
    };
};