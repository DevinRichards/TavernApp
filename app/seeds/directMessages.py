from app.models.directMessages import db, Direct_Message, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

def seed_direct_messages():
    direct_message1 = Direct_Message(
        content='Hello, how are you?',
        senderId=1,
        receiverId=2,
    )

    direct_message2 = Direct_Message(
        content='Im doing well, thanks!',
        senderId=2,
        receiverId=1,
    )

    direct_message3 = Direct_Message(
        content='What are you up to?',
        senderId=3,
        receiverId=4,
    )

    direct_message4 = Direct_Message(
        content='Not much, just working on a project.',
        senderId=4,
        receiverId=3,
    )

    direct_message5 = Direct_Message(
        content='Lets catch up soon!',
        senderId=5,
        receiverId=1,
    )

    db.session.add(direct_message1)
    db.session.add(direct_message2)
    db.session.add(direct_message3)
    db.session.add(direct_message4)
    db.session.add(direct_message5)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_direct_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.direct_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM direct_messages"))

    db.session.commit()
