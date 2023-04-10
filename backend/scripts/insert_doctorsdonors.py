import random
from faker import Faker
from tqdm import tqdm

fake = Faker()
NR_OF_RECORDS = 10000

# class DoctorsDonors(models.Model):
#     donor = models.ForeignKey(to=Donor, on_delete=models.CASCADE)
#     doctor = models.ForeignKey(to=Doctor, on_delete=models.CASCADE)

sql = 'INSERT INTO doctors_doctorsdonors(doctor_id, donor_id) VALUES '
for file_nr in range(10):

    f = open('insert_doctorsdonors' + str(file_nr) + '.sql', 'w')
    f.write(sql)
    for i in tqdm(range(NR_OF_RECORDS)):
        curr_num = fake.unique.random_int(1, 1_000_000)
        for j in range(10):
            s = "('" + str(i // 10 + 1 + j + file_nr * 80000) + "', '" + str(curr_num) + "'),\n"
            f.write(s)
    s = "('" + str(3) + "', '" + str(1000000) + "');\n"
    f.write(s)
    f.close()

