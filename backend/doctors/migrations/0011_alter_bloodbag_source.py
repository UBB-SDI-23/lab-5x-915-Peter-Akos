# Generated by Django 4.1.7 on 2023-03-24 11:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('doctors', '0010_remove_bloodbag_doctor_remove_bloodbag_donor_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bloodbag',
            name='source',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctors.doctorsdonors'),
        ),
    ]
