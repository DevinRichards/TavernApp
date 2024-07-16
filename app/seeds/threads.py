from app.models.threads import db, Thread, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

def seed_threads():
    thread1 = Thread(
        content='Thread content 1',
        senderId=1,
        serverId=1,  # Specify the serverId for the first thread
        channelId=1,  # Specify the channelId for the first thread
    )

    thread2 = Thread(
        content='Thread content 2',
        senderId=2,
        serverId=2,  # Specify the serverId for the second thread
        channelId=3,  # Specify the channelId for the second thread
    )

    thread3 = Thread(
        content='Thread content 3',
        senderId=3,
        serverId=3,  # Specify the serverId for the third thread
        channelId=4,  # Specify the channelId for the third thread
    )

    thread4 = Thread(
        content='Thread content 4',
        senderId=4,
        serverId=4,  # Specify the serverId for the fourth thread
        channelId=5,  # Specify the channelId for the fourth thread
    )

    thread5 = Thread(
        content='Thread content 5',
        senderId=5,
        serverId=5,  # Specify the serverId for the fifth thread
        channelId=6,  # Specify the channelId for the fifth thread
    )

    db.session.add_all([thread1, thread2, thread3, thread4, thread5])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_threads():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.threads RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM threads"))

    db.session.commit()
