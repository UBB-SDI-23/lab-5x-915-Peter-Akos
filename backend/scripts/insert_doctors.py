import random
from faker import Faker
from tqdm import tqdm

fake = Faker()
NR_OF_RECORDS = 10

# class Doctor(models.Model):
#     name = models.CharField(max_length=50, default="Missing name")
#     title = models.CharField(max_length=30, default="Missing Title")
#     salary = models.IntegerField(default=0)
#     hospital = models.ForeignKey(to=Clinic, on_delete=models.PROTECT, related_name='doctors_set')
#     university_gpa = models.FloatField(default=0)
#     donors = models.ManyToManyField(to='Donor', through='DoctorsDonors', related_name='donors_set')
titles = ['Surgeon', 'Medical student', 'Junior doctor', 'Consultant', 'Specialist doctor', 'Academic doctor']

sql = 'INSERT INTO doctors_doctor(name, title, salary, hospital_id, university_gpa) VALUES '
f = open('insert_doctors.sql', 'w')
f.write(sql)

for i in tqdm(range(NR_OF_RECORDS)):
    if i == NR_OF_RECORDS-1:
        s = "('" + fake.name() + "', '" + random.choice(titles) + "', '" + str(random.randint(20000, 100000)) + "', '" + str(
            random.randint(1, 1000000)) + "', '" + str(random.randint(100, 500)/100) + "');\n"
        f.write(s)
    else:
        s = "('" + fake.name() + "', '" + random.choice(titles) + "', '" + str(random.randint(20000, 100000)) + "', '" + str(
            random.randint(1, 1000000)) + "', '" + str(random.randint(100, 500) / 100) + "'),\n"
        f.write(s)

# f.write(";")
f.close()


def create_batch(size=1000):
    return [(fake.name(), fake.text()[:50], fake.address()[:50], random.randint(1, 800), random.randint(1, 200),) for x in
            range(size)]