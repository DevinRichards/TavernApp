from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Channel(db.Model):
  __tablename__ = 'channels'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}


  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False)
  description = db.Column(db.String(100))
  serverID = db.Column(db.String(255), db.ForeignKey(add_prefix_for_prod('servers.id')), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

  server = db.relationship('Server', back_populates='channels', foreign_keys='Channel.serverID', lazy=True)
  messages = db.relationship('Message', back_populates='channel', lazy=True)
  threads = db.relationship('Thread', back_populates='channel', lazy=True)


  def to_dict(self):
    return {
        'id': self.id,
        'name':self.name,
        'description': self.description,
        'serverID':self.serverID,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
