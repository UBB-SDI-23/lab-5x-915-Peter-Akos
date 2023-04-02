# Generated by Django 4.1.7 on 2023-03-24 11:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('doctors', '0009_alter_doctor_salary_alter_doctor_university_gpa'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bloodbag',
            name='doctor',
        ),
        migrations.RemoveField(
            model_name='bloodbag',
            name='donor',
        ),
        migrations.RemoveField(
            model_name='doctor',
            name='collected_donations',
        ),
        migrations.RemoveField(
            model_name='donor',
            name='donations',
        ),
        migrations.CreateModel(
            name='DoctorsDonors',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctors.doctor')),
                ('donor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctors.donor')),
            ],
            options={
                'unique_together': {('donor', 'doctor')},
            },
        ),
        migrations.AddField(
            model_name='bloodbag',
            name='source',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='doctors.doctorsdonors'),
        ),
        migrations.AddField(
            model_name='doctor',
            name='donors',
            field=models.ManyToManyField(related_name='donors_set', through='doctors.DoctorsDonors', to='doctors.donor'),
        ),
        migrations.AddField(
            model_name='donor',
            name='doctors',
            field=models.ManyToManyField(through='doctors.DoctorsDonors', to='doctors.doctor'),
        ),
    ]
