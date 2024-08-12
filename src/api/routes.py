"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime, timezone
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200












































#CREAR USUARIO
@api.route('/user', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        existing_user = User.query.filter_by(correo=data["correo"]).first()
        
        if existing_user:
            return jsonify({"msg": "Email already exists"}), 400

        
        fecha_de_nacimiento = datetime.strptime(data['fecha_de_nacimiento'], '%Y-%m-%d').date()
        user_created = User(
            nombre_usuario=data["nombre_usuario"],
            apellido=data["apellido"],
            descripcion=data.get("descripcion"),
            fecha_de_nacimiento=data["fecha_de_nacimiento"],
            codigo_de_area=data["codigo_de_area"],
            telefono=data["telefono"],
            correo=data["correo"],
            clave=data["clave"],
            is_active=data.get('is_active', True),
            foto=data.get("foto"),
            is_psicologo=data.get('is_psicologo', False)
        )
        db.session.add(user_created)
        db.session.commit()

        response_body = {
            "msg": "User created successfully",
            "user": user_created.serialize()
        }
        return jsonify(response_body), 201
    
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    #CREAR ESPECIALIDAD
@api.route('/especialidad', methods=['POST'])
def create_especialidad():
    try:
        data = request.get_json()
        nueva_especialidad = Especialidades(especialidad=data['especialidad'])

        db.session.add(nueva_especialidad)
        db.session.commit()

        return jsonify({"msg": "Especialidad creada exitosamente"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    #CREAR COMENTARIO/RESEÑA
@api.route('/comentario', methods=['POST'])
def create_comentario():
    try:
        data = request.get_json()

        # Verificar que id_profesional corresponde a un usuario que es psicólogo
        profesional = User.query.filter_by(id=data['id_profesional'], is_psicologo=True).first()
        if not profesional:
            return jsonify({"msg": "El profesional especificado no es un psicólogo válido"}), 400

        nuevo_comentario = Comentarios(
            id_usuario=data['id_usuario'],
            id_profesional=data['id_profesional'],
            comentario=data['comentario'],
            puntaje=data['puntaje'],
            fecha_de_publicacion=datetime.now(timezone.utc)
        )

        db.session.add(nuevo_comentario)
        db.session.commit()

        return jsonify({"msg": "Comentario creado exitosamente"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
#OBTENER TODOS LOS USUARIOS
@api.route('/usuarios', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        users_serialized = [user.serialize() for user in users]

        return jsonify(users_serialized), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
#OBTENER TODAS LAS ESPECIALIDADES  
@api.route('/especialidades', methods=['GET'])
def get_especialidades():
    try:
        especialidades = Especialidades.query.all()
        especialidades_serialized = [especialidad.serialize() for especialidad in especialidades]

        return jsonify(especialidades_serialized), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500

#OBTENER TODOS LOS COMENTARIOS 
@api.route('/comentarios', methods=['GET'])
def get_comentarios():
    try:
        comentarios = Comentarios.query.all()
        comentarios_serialized = [comentario.serialize() for comentario in comentarios]

        return jsonify(comentarios_serialized), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500

 #MODIFICAR USUARIO
@api.route('/usuario/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.get_json()
        user = User.query.get(user_id)

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        user.nombre_usuario = data.get("nombre_usuario", user.nombre_usuario)
        user.apellido = data.get("apellido", user.apellido)
        user.descripcion = data.get("descripcion", user.descripcion)
        user.fecha_de_nacimiento = data.get("fecha_de_nacimiento", user.fecha_de_nacimiento)
        user.codigo_de_area = data.get("codigo_de_area", user.codigo_de_area)
        user.telefono = data.get("telefono", user.telefono)
        user.correo = data.get("correo", user.correo)
        user.clave = data.get("clave", user.clave)
        user.is_psicologo = data.get("is_psicologo", user.is_psicologo)
        user.foto = data.get("foto", user.foto)

        db.session.commit()

        return jsonify({"msg": "Usuario actualizado exitosamente"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500   
#ELIMINAR USUARIO
@api.route('/usuario/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.query.get(user_id)

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        db.session.delete(user)
        db.session.commit()

        return jsonify({"msg": "Usuario eliminado exitosamente"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500

# Modificar un comentario 
@api.route('/comentarios/<int:comentario_id>', methods=['PUT'])
def update_comentario(comentario_id):
    try:
        data = request.get_json()
        comentario = Comentarios.query.get(comentario_id)

        if not comentario:
            return jsonify({"msg": "Comentario no encontrado"}), 404

        comentario.comentario = data.get("comentario", comentario.comentario)
        comentario.puntaje = data.get("puntaje", comentario.puntaje)
        comentario.fecha_de_publicacion = datetime.now(timezone.utc)

        db.session.commit()

        return jsonify({"msg": "Comentario actualizado exitosamente"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500

# Eliminar un comentario 
@api.route('/comentarios/<int:comentario_id>', methods=['DELETE'])
def delete_comentario(comentario_id):
    try:
        comentario = Comentarios.query.get(comentario_id)

        if not comentario:
            return jsonify({"msg": "Comentario no encontrado"}), 404

        db.session.delete(comentario)
        db.session.commit()

        return jsonify({"msg": "Comentario eliminado exitosamente"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500

