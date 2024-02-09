from app.models.channels import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text

# Adds channels
def seed_channels():
    channel1 = Channel(
        name='General',
        serverId=1,
        description='General chat channel',
    )

    channel2 = Channel(
        name='Announcements',
        serverId=1,
        description='Announcement channel',
    )

    channel3 = Channel(
        name='Random',
        serverId=2,
        description='Random chat channel',
    )

    channel4 = Channel(
        name='Music',
        serverId=3,
        description='Music discussion channel',
    )

    channel5 = Channel(
        name='Gaming',
        serverId=4,
        description='Gaming chat channel',
    )

    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.add(channel5)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
