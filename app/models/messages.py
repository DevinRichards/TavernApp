from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Message(db.Model):
  __tablename__ = 'messages'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}


  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String(2550), nullable=False)
  channelId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
  senderId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  threadId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('threads.id')))
  profilePictureFile = db.Column(db.String(255))
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

  channel = db.relationship('Channel', back_populates='messages', foreign_keys='Message.channelId', lazy=True)
  sender = db.relationship('User', back_populates='sender', foreign_keys='Message.senderId', lazy=True)
  thread = db.relationship('Thread', back_populates='messages', foreign_keys='Message.threadId', lazy=True)
  reactions = db.relationship('Reaction', back_populates='message', lazy=True)

  def to_dict(self):
    return {
        'id': self.id,
        'content':self.content,
        'channelId':self.channelId,
        'senderId':self.senderId,
        'threadId':self.threadId,
        'profilePictureFile': self.profilePictureFile,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
