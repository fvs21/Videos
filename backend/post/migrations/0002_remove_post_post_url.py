# Generated by Django 4.2.18 on 2025-01-25 16:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='post_url',
        ),
    ]
