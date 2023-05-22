import random
from faker import Faker
from tqdm import tqdm

fake = Faker()
NR_OF_RECORDS = 500000


sql = 'INSERT INTO doctors_clinic(name, description, address, beds, "nrRooms") VALUES '
f = open('insert_clinics_2.sql', 'w')
f.write(sql)
buffer = ""

for i in tqdm(range(NR_OF_RECORDS)):
    if i%1000 == 0:
        s = "('" + fake.name() + "', '" + fake.text()[:50] + "', '" + fake.address()[:50] + "', '" + str(
            random.randint(1, 800)) + "', '" + str(random.randint(1, 200)) + "');\n"
        buffer += s
        buffer += 'INSERT INTO doctors_clinic(name, description, address, beds, "nrRooms") VALUES '
        # f.write(s)
    else:
        s = "('" + fake.name() + "', '" + fake.text()[:50] + "', '" + fake.address()[:50] + "', '" + str(
            random.randint(1, 800)) + "', '" + str(random.randint(1, 200)) + "'),\n"
        # f.write(s)
        buffer += s

# f.write(";")
buffer = buffer[:-2] + ';'
f.write(buffer)
f.close()
