# Generated by Django 4.1.3 on 2023-11-12 16:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("common", "0005_alter_user_user_type"),
        ("counseling", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="counselingapplication",
            name="approved",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="counseling",
            name="counselor",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="common.counselor",
            ),
        ),
    ]
