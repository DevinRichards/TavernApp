from app.models.messages import db, Message, environment, SCHEMA
from sqlalchemy.sql import text

def seed_messages():

    message1 = Message(
        content='Hello, world!',
        channelID=1,
        senderID=1,
    )

    message2 = Message(
        content='Welcome to the chat!',
        channelID=1,
        senderID=2,
    )

    message3 = Message(
        content='Anybody here?',
        channelID=2,
        senderID=3,
    )

    message4 = Message(
        content='This is a test message',
        channelID=3,
        senderID=4,
    )

    message5 = Message(
        content='Great discussion!',
        channelID=4,
        senderID=5,  
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
