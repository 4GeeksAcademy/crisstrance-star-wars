"""empty message

Revision ID: 03c598290fa2
Revises: 
Create Date: 2024-08-30 09:47:15.893013

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '03c598290fa2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name_event', sa.String(length=250), nullable=True),
    sa.Column('style', sa.String(length=250), nullable=True),
    sa.Column('date', sa.String(length=250), nullable=True),
    sa.Column('price', sa.String(length=250), nullable=True),
    sa.Column('description', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('events', sa.String(length=250), nullable=True),
    sa.Column('venue', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('userProfile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('address', sa.String(length=250), nullable=True),
    sa.Column('city', sa.String(length=250), nullable=True),
    sa.Column('country', sa.String(length=250), nullable=True),
    sa.Column('event_style', sa.String(length=250), nullable=True),
    sa.Column('id_favorites', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_favorites'], ['favorites.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('venue',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=True),
    sa.Column('email', sa.String(length=250), nullable=True),
    sa.Column('number', sa.Integer(), nullable=True),
    sa.Column('capacity', sa.String(length=250), nullable=True),
    sa.Column('address', sa.String(length=250), nullable=True),
    sa.Column('classification', sa.String(length=250), nullable=True),
    sa.Column('events_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['events_id'], ['events.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('commentsEvents',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_profile_id', sa.Integer(), nullable=True),
    sa.Column('events_id', sa.Integer(), nullable=True),
    sa.Column('content', sa.String(length=250), nullable=True),
    sa.Column('date', sa.String(length=250), nullable=True),
    sa.Column('rating', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['events_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['user_profile_id'], ['userProfile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('commentsVenue',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_profile_id', sa.Integer(), nullable=True),
    sa.Column('venue_id', sa.Integer(), nullable=True),
    sa.Column('content', sa.String(length=250), nullable=True),
    sa.Column('date', sa.String(length=250), nullable=True),
    sa.Column('rating', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['user_profile_id'], ['userProfile.id'], ),
    sa.ForeignKeyConstraint(['venue_id'], ['venue.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('partnerProfile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=True),
    sa.Column('description', sa.String(length=1000), nullable=True),
    sa.Column('venue_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['venue_id'], ['venue.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('payment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('purchase_date', sa.String(length=250), nullable=True),
    sa.Column('price', sa.String(length=250), nullable=True),
    sa.Column('user_profile_id', sa.Integer(), nullable=True),
    sa.Column('events_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['events_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['user_profile_id'], ['userProfile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=250), nullable=False),
    sa.Column('email', sa.String(length=250), nullable=False),
    sa.Column('profile_id', sa.Integer(), nullable=True),
    sa.Column('partner', sa.Boolean(), nullable=False),
    sa.Column('partner_profile_id', sa.Integer(), nullable=True),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['partner_profile_id'], ['partnerProfile.id'], ),
    sa.ForeignKeyConstraint(['profile_id'], ['userProfile.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('payment')
    op.drop_table('partnerProfile')
    op.drop_table('commentsVenue')
    op.drop_table('commentsEvents')
    op.drop_table('venue')
    op.drop_table('userProfile')
    op.drop_table('favorites')
    op.drop_table('events')
    # ### end Alembic commands ###
