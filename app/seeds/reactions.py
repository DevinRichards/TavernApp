from app.models.reactions import db, Reaction, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

# Adds reactions
def seed_reactions():

    reaction1 = Reaction(
        emoji='👍',
        messageId=1,
        userId=1,
    )

    reaction2 = Reaction(
        emoji='❤️',
        messageId=2,
        userId=2,
    )

    reaction3 = Reaction(
        emoji='😄',
        messageId=3,
        userId=3,
    )

    reaction4 = Reaction(
        emoji='👏',
        messageId=4,
        userId=4,
    )

    reaction5 = Reaction(
        emoji='🔥',
        messageId=5,
        userId=5,
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
