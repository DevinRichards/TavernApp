from app.models import db, environment, SCHEMA
from app.models.servers import Server
from app.models.channels import Channel
from sqlalchemy.sql import text

# Adds servers
def seed_servers():
    server1 = Server(
        profilePictureUrl='https://preview.redd.it/szmxuwhpuqq31.png?width=960&crop=smart&auto=webp&s=465988b76a19c7a03d5269622df1f2ef61ad4020',

        ownerId=1,
        name='Anime Lovers Unite',
    )

    # Create channels and associate them with the server
    general_channel1 = Channel(
        name='General',
        server=server1,
        description='General chat channel'
    )

    announcements_channel1 = Channel(
        name='Announcements',
        server=server1,
        description='Announcement channel'
    )

    server2 = Server(
        profilePictureUrl='https://i.pinimg.com/736x/23/12/a7/2312a7868013e4a1bfc95d2b05f65dbc.jpg',
        ownerId=2,
        name='Assassin"s Creed',
    )

    # Create channels and associate them with the server
    general_channel2 = Channel(
        name='General',
        server=server2,
        description='General chat channel',
    )

    random_channel2 = Channel(
        name='Random',
        server=server2,
        description='Random chat channel',
    )

    server3 = Server(
        profilePictureUrl='https://images2.alphacoders.com/711/711450.jpg',
        ownerId=3,
        name='Legend of Zelda',
    )

    # Create channels and associate them with the server
    general_channel3 = Channel(
        name='General',
        server=server3,
        description='General chat channel',
    )

    music_channel3 = Channel(
        name='Music',
        server=server3,
        description='Music chat channel',
    )

    server4 = Server(
        profilePictureUrl='https://i.redd.it/eid2hsejfjn71.jpg',
        ownerId=4,
        name='Fallout',

    )

    # Create channels and associate them with the server
    general_channel4 = Channel(
        name='General',
        server=server4,
        description='General chat channel',
    )

    gaming_channel4 = Channel(
        name='Gaming',
        server=server4,
        description='Gaming chat channel',
    )

    server5 = Server(
        profilePictureUrl='https://www.pockettactics.com/wp-content/sites/pockettactics/2022/02/Kingdom-hearts-III-wallpaper.jpg',
        ownerId=5,
        name='Kingdom Hearts',
    )

    # Create channels and associate them with the server
    general_channel5 = Channel(
        name='General',
        server=server5,
        description='General chat channel',
    )

    tech_channel5 = Channel(
        name='Tech',
        server=server5,
        description='Tech chat channel',
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
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()
