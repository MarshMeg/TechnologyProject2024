# Generated by Django 5.0.2 on 2024-03-12 07:41

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('api', '0003_test_likes_test_watched_count'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Answers',
            new_name='Answer',
        ),
        migrations.AlterModelOptions(
            name='question',
            options={},
        ),
    ]