from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Server, Channel, Message
from datetime import datetime
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)

message_routes = Blueprint('messages', __name__)

# Get messages
@message_routes.route('/', methods=['GET'])
def get_messages():
    messages = Message.query.all()
    return jsonify([message.to_dict() for message in messages]), 200

# Create new message
@message_routes.route('/', methods=['POST'])
def create_message():
    data = request.json
    print("This is data in messages route:", data)
    content = data.get('msg')
    channelId = data.get('channelId')
    senderId = data.get('senderId')
    threadId = data.get('threadId', None)

    if not content or not channelId or not senderId:
        return jsonify({'error': 'Missing required fields'}), 400

    new_message = Message(
        content=content,
        channelId=channelId,
        senderId=senderId,
        threadId=threadId,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.session.add(new_message)
    db.session.commit()

    return jsonify(new_message.to_dict()), 201

# Update message
@message_routes.route('/messages/<int:message_id>', methods=['PUT'])
def update_message(message_id):
    data = request.json
    message = Message.query.get(message_id)

    if not message:
        return jsonify({'error': 'Message not found'}), 404

    # Update message fields
    if 'content' in data:
        message.content = data['content']
    if 'channelId' in data:
        message.channelId = data['channelId']
    if 'senderId' in data:
        message.senderId = data['senderId']
    if 'threadId' in data:
        message.threadId = data['threadId']
    message.updated_at = datetime.utcnow()

    db.session.commit()

    return jsonify(message.to_dict()), 200

# Delete message
@message_routes.route('/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    message = Message.query.get(message_id)

    if not message:
        return jsonify({'error': 'Message not found'}), 404

    db.session.delete(message)
    db.session.commit()

    return jsonify({'message': 'Message deleted successfully'}), 200
