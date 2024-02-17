from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Server, Channel, Message
from app.forms.server_form import ServerForm
from app.forms.channel_form import ChannelForm

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/<int:channelId>/update', methods = ['PUT'])
@login_required
def update_channel(channelId):
  form = ChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  channel = Channel.query.get(channelId)

  server = Server.query.get(channel.serverId)

  if not channel:
   return {'errors': f"Channel {channelId} does not exist."}, 400

  if server.ownerId != current_user.id:
        return {'errors': f"Server {server.id} must be created by the current user."}, 401

  if not form.validate_on_submit():
        print("there are some errors in the form--------------------")
        print(form.errors)
        return jsonify({"error": "Form validation failed", "details": form.errors}), 400

  channel.name = form.data['name']
  channel.description = form.data['description']

  db.session.commit()
  return jsonify(channel.to_dict())

@channel_routes.route('/<int:channelId>/delete', methods = ['DELETE'])
@login_required
def delete_channel(channelId):
  channel = Channel.query.get(channelId)

  server = Server.query.get(channel.serverId)

  if not channel:
    return {'errors': f"Channel {channelId} does not exist."}, 400

  if server.ownerId != current_user.id:
    return {'errors': f"Server {server.id} must be created by the current user."}, 401

  else:
    db.session.delete(channel)
    db.session.commit()
    return jsonify({'message': 'Channel Deleted Successfully'})


@channel_routes.route('/api/channels/<int:channelId>/messages')
@login_required
def get_messages_by_channel(channelId):
    try:
        channel = Channel.query.get(channelId)

        if not channel:
            return {'errors': f"Channel {channelId} does not exist."}, 400

        messages = Message.query.filter_by(channelId=channel.id).all()

        messages_data = [message.to_dict() for message in messages]

        return jsonify({'messages': messages_data})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
