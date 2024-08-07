from app.models.serverAdmins import db, Server_Admin, environment, SCHEMA
from sqlalchemy.sql import text

# Adds server admins
def seed_server_admins():
    server_admin1 = Server_Admin(
        serverId=1,
        userId=1,
    )

    server_admin2 = Server_Admin(
        serverId=2,
        userId=2,
    )

    server_admin3 = Server_Admin(
        serverId=3,
        userId=3,
    )

    server_admin4 = Server_Admin(
        serverId=4,
        userId=4,
    )

    server_admin5 = Server_Admin(
        serverId=5,
        userId=5,
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
def undo_server_admins():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.server_admins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM server_admins"))

    db.session.commit()
