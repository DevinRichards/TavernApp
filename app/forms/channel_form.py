from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateField, SubmitField
from wtforms.validators import DataRequired

class ChannelForm(FlaskForm):
  name = StringField('Channel Name')
  description = StringField('Description of Channel')
  submit = SubmitField('Submit')
