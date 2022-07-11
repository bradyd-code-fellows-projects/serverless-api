'use strict';

const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  phone: String,
});

const peopleModel = dynamoose.model('people', peopleSchema);

exports.handler = async (event) => {
  const response = {statusCode: null, body: null};

  let pathId = event.pathParameters.id;
  let { id, name, phone } = event.queryStringParameters;
  let person = {id, name, phone};

  console.log('path id: ', pathId);
  console.log('id: ', id, 'name: ', name, 'phone: ', phone);


  try {
    const updatedPerson = await peopleModel.update(person);
    response.statusCode = 200;
    response.body = JSON.stringify(updatedPerson);
    
  } catch(e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }

  return response;
};