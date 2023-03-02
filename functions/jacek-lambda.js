const AWS = require('aws-sdk');
const database1 = new AWS.DynamoDB.DocumentClient();
const tableName4 = process.env.DYNAMODB_TABLE_NAME || 'JacekTable4';

// Parse incomfing JSON (event) to get individual values
const parseJSON = (event) => {
    let id = "";
    let name = "";
    let director = null;
    let ratings = null;
    let httpMethod = "";
    if (event.httpMethod) {
        httpMethod = event.httpMethod;
        let inputData = {};
        if (event.body) {
            if (typeof event.body == "string") {
                inputData = JSON.parse(event.body);
            }
            else {
                inputData = event.body;
            }
        }
        if (inputData.id) {
            id = inputData.id;
        }
        if (inputData.name) {
            name = inputData.name;
        }
        if (inputData.director) {
            director = inputData.director;
        }
        if (inputData.ratings) {
            ratings = inputData.ratings;
        }
    }
    return { httpMethod, id, name, director, ratings };
}

// Update DynamoDB table
const updateTable = async (event) => {
    let data;
    let success = false;
    let statusCode = '200';
    let queryParams = {
        "TableName": tableName4
    };
    let { httpMethod, id, name, director, ratings } = parseJSON(event); // Parse JSON
    try {
        switch (httpMethod) {
            case 'DELETE':
                let delKeyData = { "id": id, "name": name };
                queryParams = { ...queryParams, "Key": delKeyData };
                data = await database1.delete(queryParams).promise();
                break;
            case 'GET':
                data = await database1.scan(queryParams).promise();
                break;
            case 'POST':
                let movieItems = { "id": id, "name": name };
                if (director) {
                    movieItems = { ...movieItems, "director": director };
                }
                if (ratings) {
                    movieItems = { ...movieItems, "ratings": ratings };
                }
                queryParams = { ...queryParams, "Item": movieItems };
                data = await database1.put(queryParams).promise();
                break;
            case 'PUT':
                let keyData = { "id": id, "name": name };
                queryParams = {
                    ...queryParams,
                    "Key": keyData,
                    UpdateExpression: 'set director = :director, ratings = :ratings',
                    ExpressionAttributeValues: { ':director': director, ':ratings': ratings }
                };
                data = await database1.update(queryParams).promise();
                break;
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
        success = true;
    } catch (err) {
        statusCode = '400';
        console.log(err)
        success = false;
    } finally { }
    return { data, success, statusCode };
}

// Lambda handler function (updating DynamoDB table) 
exports.handler = async (event, context) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const { data, success, statusCode } = await updateTable(event); // Update Table
    const bodyData = {
        data: data,
        success: success,
    };
    return {
        statusCode,
        body: JSON.stringify(bodyData),
        headers
    };
};




