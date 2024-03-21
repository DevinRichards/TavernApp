from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profilePictureFile = db.Column(db.String(255), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    sender = db.relationship('Message', back_populates='sender', lazy=True)
    reactions = db.relationship('Reaction', back_populates='user', lazy=True)
    sent_direct_messages= db.relationship('Direct_Message', foreign_keys='Direct_Message.senderId', back_populates='sender', lazy=True)
    received_direct_messages = db.relationship('Direct_Message', foreign_keys='Direct_Message.receiverId', back_populates='receiver', lazy=True)
    threads = db.relationship('Thread', back_populates='user', lazy=True)
    admin_servers = db.relationship('Server_Admin', back_populates='admin', lazy=True)
    owned_servers = db.relationship('Server', back_populates='owner', lazy=True)


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashed_password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profilePictureUrl':self.profilePictureFile,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
