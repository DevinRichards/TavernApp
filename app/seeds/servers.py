from app.models import db, User,  environment, SCHEMA
from app.models.servers import Server
from sqlalchemy.sql import text


# Adds servers
def seed_servers():
    server1 = Server(
        profilePictureUrl='https://fontawesome.com/icons/server?f=classic&s=solid',
        ownerID=1,
        name='Server 1',
        channels='General, Announcements',
    )

    server2 = Server(
        profilePictureUrl='https://fontawesome.com/icons/server?f=classic&s=solid',
        ownerID=2,
        name='Server 2',
        channels='General, Random',
    )

    server3 = Server(
        profilePictureUrl='https://fontawesome.com/icons/server?f=classic&s=solid',
        ownerID=3,
        name='Server 3',
        channels='General, Music',
    )

    server4 = Server(
        profilePictureUrl='https://fontawesome.com/icons/server?f=classic&s=solid',
        ownerID=4,
        name='Server 4',
        channels='General, Gaming',
    )

    server5 = Server(
        profilePictureUrl='https://fontawesome.com/icons/server?f=classic&s=solid',
        ownerID=5,
        name='Server 5',
        channels='General, Tech',
    )

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.add(server4)
    db.session.add(server5)

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
