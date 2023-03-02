function generatePolicyDocument(principalId, effect, methodArn) {
    if (!effect || !methodArn) return null    
    let authResponse = {};    
    const policyDocument = {
        Version: '2012-10-17',
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: methodArn
        }]
    };
    authResponse.principalId = principalId    
    authResponse.policyDocument = policyDocument
    return authResponse;
}

exports.handler = async function (event) {
    const token = event.authorizationToken.toLowerCase();
    const methodArn = event.methodArn;
    switch (token) {
        case 'allow':
            return generatePolicyDocument('user', 'Allow', methodArn);
        default:
            return generatePolicyDocument('user', 'Deny', methodArn);
    }
}