from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Thread(db.Model):
  __tablename__ = 'threads'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}


  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String(2550), nullable=False)
  senderID = db.Column(db.String(255), db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

  def to_dict(self):
    return {
        'id': self.id,
        'content':self.content,
        'senderID':self.senderID,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
