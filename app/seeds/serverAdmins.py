from app.models.serverAdmins import db, ServerAdmin, environment, SCHEMA
from sqlalchemy.sql import text

# Adds server admins
def seed_server_admins():
    server_admin1 = ServerAdmin(
        serverID=1,
        userID=1,
    )

    server_admin2 = ServerAdmin(
        serverID=2,
        userID=2,
    )

    server_admin3 = ServerAdmin(
        serverID=3,
        userID=3,
    )

    server_admin4 = ServerAdmin(
        serverID=4,
        userID=4,
    )

    server_admin5 = ServerAdmin(
        serverID=5,
        userID=5,
    )

    db.session.add(server_admin1)
    db.session.add(server_admin2)
    db.session.add(server_admin3)
    db.session.add(server_admin4)
    db.session.add(server_admin5)

    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_serverAdmins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.serverAdmins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM serverAdmins"))

    db.session.commit()
