from app.models.threads import db, Thread, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

def seed_threads():
    thread1 = Thread(
        content='Thread content 1',
        senderID=1,
    )

    thread2 = Thread(
        content='Thread content 2',
        senderID=2,
    )

    thread3 = Thread(
        content='Thread content 3',
        senderID=3,
    )

    thread4 = Thread(
        content='Thread content 4',
        senderID=4,
    )

    thread5 = Thread(
        content='Thread content 5',
        senderID=5,
    )

    db.session.add(thread1)
    db.session.add(thread2)
    db.session.add(thread3)
    db.session.add(thread4)
    db.session.add(thread5)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_threads():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.threads RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM threads"))

    db.session.commit()
