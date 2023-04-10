import random
from faker import Faker
from tqdm import tqdm

fake = Faker()
NR_OF_RECORDS = 100000

# class Donor(models.Model):
#     name = models.CharField(max_length=50)
#     phone = models.CharField(max_length=15, default="Missing phone")
#     email = models.EmailField()
#     birthday = models.DateField()
#     citizenship = models.CharField(max_length=25)
#     doctors = models.ManyToManyField(to="Doctor", through="DoctorsDonors")

citizenships = ['RO', 'HU', 'US', 'GER']


sql = 'INSERT INTO doctors_donor(name, phone, email, birthday, citizenship, description) VALUES '
f = open('insert_donors.sql', 'w')
f.write(sql)

for i in tqdm(range(NR_OF_RECORDS)):
    name = fake.name()
    if i == NR_OF_RECORDS-1:
        s = "('" + name + "', '" + str(random.randint(20000, 100000)) + "', '" + name.replace(' ', '').lower() + '@gmail.com' + "', '" + \
            str(fake.date_time_between(start_date='-40y', end_date='-18y'))[:10] + "', '" + random.choice(citizenships) + "', '" + fake.text()[:200] + "');\n"
        f.write(s)
    else:
        s = "('" + name + "', '" + str(random.randint(20000, 100000)) + "', '" + name.replace(' ', '').lower() + '@gmail.com' + "', '" + \
            str(fake.date_time_between(start_date='-40y', end_date='-18y'))[:10] + "', '" + random.choice(
            citizenships) + "', '" + fake.text()[:200] + "'),\n"
        f.write(s)

# f.write(";")
f.close()

