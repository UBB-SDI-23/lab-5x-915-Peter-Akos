# Generated by Django 4.1.7 on 2023-03-19 21:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('doctors', '0005_rename_maxpatients_clinic_beds'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doctor',
            name='hospital',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='doctors_set', to='doctors.clinic'),
        ),
        migrations.CreateModel(
            name='BloodBag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=450)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctors.doctor')),
                ('donor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctors.donor')),
            ],
        ),
        migrations.AddField(
            model_name='doctor',
            name='donors',
            field=models.ManyToManyField(through='doctors.BloodBag', to='doctors.donor'),
        ),
        migrations.AddField(
            model_name='donor',
            name='doctors',
            field=models.ManyToManyField(through='doctors.BloodBag', to='doctors.doctor'),
        ),
    ]
