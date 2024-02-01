from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Server(db.Model):
  __tablename__ = 'servers'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}


  id = db.Column(db.Integer, primary_key=True)
  profilePictureUrl = db.Column(db.String(255), nullable=False, default="https://fontawesome.com/icons/user?f=classic&s=solid")
  ownerID = db.Column(db.String(255), db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  name = db.Column(db.String(40), nullable=False)
  channels = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

  owner = db.relationship('User', backref='owned_servers', foreign_keys='Server.ownerID', lazy=True)
  channels = db.relationship('Channel', backref='server', lazy=True)
  server_admins = db.relationship('ServerAdmin', backref='server', foreign_keys='ServerAdmin.serverId', lazy=True)

  def to_dict(self):
    return {
        'id': self.id,
        'profilePictureUrl': self.profilePictureUrl,
        'ownerID': self.ownerID,
        'name':self.name,
        'channels':self.channels,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
