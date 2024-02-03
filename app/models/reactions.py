from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Reaction(db.Model):
  __tablename__ = 'reactions'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}


  id = db.Column(db.Integer, primary_key=True)
  emoji = db.Column(db.String(255), nullable=False)
  messageId = db.Column(db.String(255), db.ForeignKey(add_prefix_for_prod('messages.id')), nullable=False)
  userId = db.Column(db.String(255), db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

  message = db.relationship('Message', back_populates='reactions', foreign_keys='Reaction.messageId', lazy=True)
  user = db.relationship('User', back_populates='reactions', foreign_keys='Reaction.userId', lazy=True)


  def to_dict(self):
    return {
        'id': self.id,
        'emoji':self.emoji,
        'messageId':self.messageId,
        'userId':self.userId,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
