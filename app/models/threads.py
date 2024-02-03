from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Thread(db.Model):
    __tablename__ = 'threads'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    senderId = db.Column(db.String(255), db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    serverId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), nullable=False)
    channelId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='threads', foreign_keys='Thread.senderId', lazy=True)
    messages = db.relationship('Message', back_populates='thread', lazy=True)
    server = db.relationship('Server', back_populates='threads', lazy=True)
    channel = db.relationship('Channel', back_populates='threads', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'senderId': self.senderId,
            'serverId': self.serverId,  
            'channelId': self.channelId,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
