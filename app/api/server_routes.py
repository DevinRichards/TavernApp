from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Server, Channel
from app.forms.server_form import ServerForm
from app.forms.channel_form import ChannelForm
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)

server_routes = Blueprint('servers', __name__)


@server_routes.route('/')
def servers():
  """
  Query for all servers and returns them in a list of server dictionaries
  """

  servers = Server.query.all()
  return jsonify({'servers': [server.to_dict() for server in servers]})

@server_routes.route('/<int:serverId>')
def server(serverId):
  """
  Query for a server by id And returns that server in a dictionary
  """
  server = Server.query.get(serverId)
  return jsonify(server.to_dict())

@server_routes.route('/create', methods = ['POST'])
@login_required
def create_server():
  form = ServerForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if not form.validate_on_submit():
    print("there are some errors in the form--------------------")
    print(form.errors)
    return jsonify({"error": "Form validation failed", "details": form.errors}), 400

  else:
    new_server = Server(
      profilePictureUrl = form.data['profilePictureUrl'],
      ownerId = current_user.id,
      name = form.data['name'],
    )

    db.session.add(new_server)
    db.session.commit()

    return jsonify(new_server.to_dict()), 201

@server_routes.route('/<int:serverId>/update', methods=['PUT'])
@login_required
def update_server(serverId):
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    server = Server.query.get(serverId)

    if not server:
        logging.error(f"Server {serverId} does not exist.")
        return {'errors': f"Server {serverId} does not exist."}, 400

    if server.ownerId != current_user.id:
        logging.error(f"Server {serverId} must be created by the current user.")
        return {'errors': f"Server {serverId} must be created by the current user."}, 401

    logging.debug("Form data: %s", form.data)
    if not form.validate_on_submit():
        logging.error("Form validation failed. Errors: %s", form.errors)
        return jsonify({"error": "Form validation failed", "details": form.errors}), 400

    logging.debug("Server object: %s", server)
    server.profilePictureUrl = form.data['profilePictureUrl']
    server.name = form.data['name']

    try:
        db.session.commit()
        logging.info("Server update successful.")
        return jsonify(server.to_dict())
    except Exception as e:
        logging.error("An error occurred during database commit: %s", e)
        db.session.rollback()
        return jsonify({"error": "An error occurred during database commit"}), 500


@server_routes.route('/<int:serverId>/delete', methods = ['DELETE'])
@login_required
def delete_server(serverId):
  server = Server.query.get(serverId)
  if server.ownerId != current_user.id:
        return {'errors': f"Server {serverId} must be created by the current user."}, 401

  if server:
    db.session.delete(server)
    db.session.commit()
    return jsonify({'message': 'Server Deleted successfully'})

@server_routes.route('/<int:serverId>/channels')
@login_required
def get_channels_by_server(serverId):
    server = Server.query.get(serverId)

    if not server:
        return {'errors': f"Server {serverId} does not exist."}, 400

    else:
        channels = Channel.query.filter_by(serverId=serverId).all()
        channels_list = [channel.to_dict() for channel in channels]
        return jsonify({'channels': channels_list})


@server_routes.route('/<int:serverId>/<int:channelId>')
@login_required
def get_channel_in_server(serverId, channelId):
  server = Server.query.get(serverId)

  if not server:
    return {'errors': f"Server {serverId} does not exist."}, 400

  else:
    channel = Channel.query.get(channelId)
    if not channel:
      return {'errors': f"Channel {channelId} does not exist."}, 400

    else:
      return jsonify({'channel': [channel.to_dict()]})


@server_routes.route('/<int:serverId>/channels/create', methods = ['POST'])
@login_required
def create_channel(serverId):
  form = ChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  server = Server.query.get(serverId)

  if not server:
    return {'errors': f"Server {serverId} does not exist."}, 400

  if not form.validate_on_submit():
    print("there are some errors in the form--------------------")
    print(form.errors)
    return jsonify({"error": "Form validation failed", "details": form.errors}), 400

  else:
    new_channel = Channel(
      name = form.data['name'],
      description = form.data['description'],
      serverId = server.id,
    )

    db.session.add(new_channel)
    db.session.commit()

    return jsonify(new_channel.to_dict()), 201
