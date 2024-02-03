from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Server_Admin(db.Model):
  __tablename__ = 'server_admins'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}


  id = db.Column(db.Integer, primary_key=True)
  serverId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

  server = db.relationship('Server', back_populates='admins', foreign_keys='Server_Admin.serverId', lazy=True)
  admin = db.relationship('User', back_populates='admin_servers', foreign_keys='Server_Admin.userId', lazy=True)

  def to_dict(self):
    return {
        'id': self.id,
        'serverId':self.serverId,
        'userId': self.userId,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
