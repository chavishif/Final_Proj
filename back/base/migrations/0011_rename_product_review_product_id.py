# Generated by Django 4.1.5 on 2023-03-30 15:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_review'),
    ]

    operations = [
        migrations.RenameField(
            model_name='review',
            old_name='product',
            new_name='product_id',
        ),
    ]
