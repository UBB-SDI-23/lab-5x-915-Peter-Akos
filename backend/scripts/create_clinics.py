import random
from faker import Faker
from tqdm import tqdm

fake = Faker()
NR_OF_RECORDS = 1000000


sql = 'INSERT INTO doctors_clinic(name, description, address, beds, "nrRooms") VALUES '
f = open('insert_clinics.sql', 'w')
f.write(sql)

for i in tqdm(range(NR_OF_RECORDS)):
    if i == NR_OF_RECORDS-1:
        s = "('" + fake.name() + "', '" + fake.text()[:50] + "', '" + fake.address()[:50] + "', '" + str(
            random.randint(1, 800)) + "', '" + str(random.randint(1, 200)) + "');\n"
        f.write(s)
    else:
        s = "('" + fake.name() + "', '" + fake.text()[:50] + "', '" + fake.address()[:50] + "', '" + str(random.randint(1, 800)) + "', '" + str(random.randint(1, 200)) + "'),\n"
        f.write(s)

# f.write(";")
f.close()


def create_batch(size=1000):
    return [(fake.name(), fake.text()[:50], fake.address()[:50], random.randint(1, 800), random.randint(1, 200),) for x in
            range(size)]