from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateField, SubmitField
from wtforms.validators import DataRequired


class ServerForm(FlaskForm):
  profilePictureUrl = StringField('Profile Picture URL')
  name = StringField('Server Name')
  submit = SubmitField('Submit')
