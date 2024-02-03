from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Server(db.Model):
  __tablename__ = 'servers'

  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  profilePictureUrl = db.Column(db.String(255), nullable=False, default="https://fontawesome.com/icons/user?f=classic&s=solid")
  ownerId = db.Column(db.String(255), db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  name = db.Column(db.String(40), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

  owner = db.relationship('User', back_populates='owned_servers', foreign_keys='Server.ownerId', lazy=True)
  channels = db.relationship('Channel', back_populates='server', lazy=True)
  admins = db.relationship('ServerAdmin', back_populates='server', foreign_keys='ServerAdmin.serverId', lazy=True)
  threads = db.relationship('Thread', back_populates='server', lazy=True)  # Added relationship

  def to_dict(self):
    return {
        'id': self.id,
        'profilePictureUrl': self.profilePictureUrl,
        'ownerId': self.ownerId,
        'name': self.name,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
