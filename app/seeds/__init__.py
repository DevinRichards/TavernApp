from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .serverAdmins import seed_server_admins, undo_server_admins
from .channels import seed_channels, undo_channels
from .messages import seed_messages, undo_messages
from .reactions import seed_reactions, undo_reactions
from .threads import seed_threads, undo_threads
from .directMessages import seed_direct_messages, undo_direct_messages

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_direct_messages()
        undo_reactions()
        undo_messages()
        undo_threads()
        undo_server_admins()
        undo_servers()
        undo_users()
    seed_users()
    seed_servers()
    seed_server_admins()
    seed_threads()
    seed_messages()
    seed_reactions()
    seed_direct_messages()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_direct_messages()
    undo_threads()
    undo_reactions()
    undo_messages()
    undo_server_admins()
    undo_servers()
    undo_users()
    # Add other undo functions here
