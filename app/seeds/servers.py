from app.models import db, environment, SCHEMA
from app.models.servers import Server
from app.models.channels import Channel
from sqlalchemy.sql import text

# Adds servers
def seed_servers():
    server1 = Server(
        profilePictureUrl='https://fontawesome.com/icons/server?f=classic&s=solid',
        ownerId=1,
        name='Server 1',
    )

    # Create channels and associate them with the server
    general_channel1 = Channel(
        name='General',
        server=server1,
    )

    announcements_channel1 = Channel(
        name='Announcements',
        server=server1,
    )

    server2 = Server(
        profilePictureUrl='https://fontawesome.com/icons/server?f=classic&s=solid',
        ownerId=2,
        name='Server 2',
    )

    # Create channels and associate them with the server
    general_channel2 = Channel(
        name='General',
        server=server2,
    )

    random_channel2 = Channel(
        name='Random',
        server=server2,
    )

    server3 = Server(
        profilePictureUrl='https://fontawesome.com/icons/server?f=classic&s=solid',
        ownerId=3,
        name='Server 3',
    )

    # Create channels and associate them with the server
    general_channel3 = Channel(
        name='General',
        server=server3,
    )

    music_channel3 = Channel(
        name='Music',
        server=server3,
    )

    server4 = Server(
        profilePictureUrl='https://fontawesome.com/icons/server?f=classic&s=solid',
        ownerId=4,
        name='Server 4',
    )

    # Create channels and associate them with the server
    general_channel4 = Channel(
        name='General',
        server=server4,
    )

    gaming_channel4 = Channel(
        name='Gaming',
        server=server4,
    )

    server5 = Server(
        profilePictureUrl='https://fontawesome.com/icons/server?f=classic&s=solid',
        ownerId=5,
        name='Server 5',
    )

    # Create channels and associate them with the server
    general_channel5 = Channel(
        name='General',
        server=server5,
    )

    tech_channel5 = Channel(
        name='Tech',
        server=server5,
    )

    db.session.add_all([
        server1, server2, server3, server4, server5,
        general_channel1, announcements_channel1,
        general_channel2, random_channel2,
        general_channel3, music_channel3,
        general_channel4, gaming_channel4,
        general_channel5, tech_channel5,
    ])

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()
