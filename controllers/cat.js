'use strict';

let uuid = require("uuid");
let Cat = require('../models/catModel');

module.exports = {
  createCat: (event, context, callback) => {
    let body = JSON.parse(event.body);

    if (typeof body.name !== "string" || typeof body.kind !== "string") {
      return callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: "Cần điền thông tin cần thêm mới.",
        })
      });
    }

    let catItem = {
      id: uuid.v1(),
      name: body.name,
      kind: body.kind,
    };

    Cat.create(catItem, (err, catResult) => {
      if (err) {
        return callback(err);
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Create cat sucessfully.",
          cat: catResult.get()
        })
      });
    });
  },
  getCatById: (event, context, callback) => {
    let catId = event.pathParameters.id;
    Cat.getById(catId, (err, catResult) => {
      if (err) {
        return callback(err);
      }
      if (!catResult) {
        return callback(null, {
          statusCode: 404,
          body: JSON.stringify({
            error: "Cat not found!",
          })
        });
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          cat: catResult.get()
        })
      });
    });
  },
  updateCatById: (event, context, callback) => {
    let catId = event.pathParameters.id;
    let body = JSON.parse(event.body);

    let catItem = {
      id: catId,
      name: body.name,
      kind: body.kind,
    };

    Cat.update(catItem, (err, catResult) => {
      if (err) {
        return callback(err);
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Update cat sucessfully.",
          cat: catResult.get()
        })
      });
    });
  },
  deleteCatById: (event, context, callback) => {
    let catId = event.pathParameters.id;
    Cat.deleteById(catId, (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Delete cat sucessfully."
        })
      });
    });
  }
};