import random
from faker import Faker
from tqdm import tqdm

fake = Faker()
NR_OF_RECORDS = 1000000

# class BloodBag(models.Model):
#     source = models.ForeignKey(to=DoctorsDonors, on_delete=models.CASCADE)
#     quantity = models.IntegerField(default=450)
#     date = models.DateField(default=datetime.date.today, blank=True)


sql = 'INSERT INTO doctors_bloodbag(source_id, quantity, date) VALUES '
f = open('insert_bloodbags_2.sql', 'w')
f.write(sql)

for i in tqdm(range(NR_OF_RECORDS)):
    if i == NR_OF_RECORDS-1:
        s = "('" + str(random.randint(1, 10000000)) + "', '" + str(random.randint(200, 450)) + "', '" + str(fake.date_time_between(start_date='-2y', end_date='-1y'))[:10] + "');\n"
        f.write(s)
    else:
        s = "('" + str(random.randint(1, 10000000)) + "', '" + str(random.randint(200, 450)) + "', '" + str(fake.date_time_between(start_date='-2y', end_date='-1y'))[:10] + "'),\n"
        f.write(s)

# f.write(";")
f.close()


def create_batch(size=1000):
    return [(fake.name(), fake.text()[:50], fake.address()[:50], random.randint(1, 800), random.randint(1, 200),) for x in
            range(size)]