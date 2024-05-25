"""empty message

Revision ID: aed84f6005da
Revises: 4d9b0a481d2e
Create Date: 2024-05-25 19:14:24.837998

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aed84f6005da'
down_revision = '4d9b0a481d2e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trolley', schema=None) as batch_op:
        batch_op.alter_column('course_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('order_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trolley', schema=None) as batch_op:
        batch_op.alter_column('order_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('course_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
