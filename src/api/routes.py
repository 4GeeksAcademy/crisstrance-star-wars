"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Posts


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        # OPCION 2
        # result = []
        # for rows in rows:
        #     result.append(rows.serialize())

        # OPCION 1
        # var = [ objetivo for iterador in lista]
        result = [ row.serialize() for row in rows]
        response_body['message'] = 'Listado de Publicaciones'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        response_body['message'] = 'Creando una Publicacion'
        response_body['results'] = {}
        return response_body, 200
    

@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def post(id):
    response_body = {}
    if request.method == 'GET':
        response_body['message'] = f'Datos de Publicacion {id}'
        response_body['results'] = {}
        return response_body, 200
    if request.method == 'PUT':
        response_body['message'] = f'Edit de la Publicacion {id}'
        response_body['results'] = {}
        return response_body, 200
    if request.method == 'DELETE':
        response_body['message'] = f'Eliminada Publicacion {id}'
        response_body['results'] = {}
        return response_body, 200