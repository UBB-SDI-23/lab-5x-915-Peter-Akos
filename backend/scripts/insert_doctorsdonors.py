import random
from faker import Faker
from tqdm import tqdm

fake = Faker()
NR_OF_RECORDS = 88000

# class DoctorsDonors(models.Model):
#     donor = models.ForeignKey(to=Donor, on_delete=models.CASCADE)
#     doctor = models.ForeignKey(to=Doctor, on_delete=models.CASCADE)

sql = 'INSERT INTO doctors_doctorsdonors(doctor_id, donor_id) VALUES '
for file_nr in range(10):

    f = open('insert_doctorsdonors_2' + str(file_nr) + '.sql', 'w')
    f.write(sql)
    for i in tqdm(range(NR_OF_RECORDS)):
        curr_num = fake.unique.random_int(9_002, 999_999)
        for j in range(20):
            # s = "('" + str(i // 11 + 1 + j + file_nr * 80000) + "', '" + str(curr_num) + "'),\n"
            s = "('" + str(curr_num) + "', '" + str(i // 20 + 1 + j + file_nr * 80000) + "'),\n"
            f.write(s)
    s = "('" + str(1000000) + "', '" + str(file_nr+10000) + "');\n"
    f.write(s)
    f.close()

