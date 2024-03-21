from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateField, SubmitField
from wtforms.validators import DataRequired


class ServerForm(FlaskForm):
  name = StringField('Server Name')
  profilePictureUrl = StringField('Profile Picture URL')
  submit = SubmitField('Submit')
