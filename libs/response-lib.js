// export function updateBody(key_name, data) {
//     switch (key_name) {
//         case "CONSENT":
//             return {
//                 optin: data,
//                     modified: new Date()
//             };
//         case "APPROVAL":
//             return {
//                 approval: data,
//                     modified: new Date()
//             };
//         case "CHECKOUT":
//             return {
//                 checkout: data,
//                     modified: new Date()
//             };
//     }
// }

export function success(body) {
    return buildResponse(200, body);
}

export function failure(body) {
    return buildResponse(500, body);
}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(body)
    };
}