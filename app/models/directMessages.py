from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class DirectMessage(db.Model):
  __tablename__ = 'directMessages'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}


  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String(255), nullable=False)
  senderId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  receiverId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

  sender = db.relationship('User', back_populates='sent_direct_messages', foreign_keys='DirectMessage.senderId', lazy=True)
  receiver = db.relationship('User', back_populates='received_direct_messages', foreign_keys='DirectMessage.receiverId', lazy=True)


  def to_dict(self):
    return {
        'id': self.id,
        'content':self.content,
        'senderId':self.senderId,
        'receiverId':self.receiverId,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
