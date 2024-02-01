from app.models.reactions import db, Reaction, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

# Adds reactions
def seed_reactions():

    reaction1 = Reaction(
        emoji='👍',
        messageID=1,
        userID=1,
    )

    reaction2 = Reaction(
        emoji='❤️',
        messageID=2,
        userID=2,
    )

    reaction3 = Reaction(
        emoji='😄',
        messageID=3,
        userID=3,
    )

    reaction4 = Reaction(
        emoji='👏',
        messageID=4,
        userID=4,
    )

    reaction5 = Reaction(
        emoji='🔥',
        messageID=5,
        userID=5,
    )

    db.session.add(reaction1)
    db.session.add(reaction2)
    db.session.add(reaction3)
    db.session.add(reaction4)
    db.session.add(reaction5)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reactions"))

    db.session.commit()
