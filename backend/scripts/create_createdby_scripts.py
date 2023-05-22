import random
from tqdm import tqdm
NR_OF_USERS = 1000
NR_OF_RECORDS = 1000000
f = open('insert_createdby_bloodbag.sql', 'w')
buffer = ""

for i in tqdm(range(NR_OF_RECORDS // 1000)):
    buffer += 'update doctors_bloodbag set "createdBy_id" = ' + str(random.randint(1, 1000)) + ' where id > ' + str(i*1000) + ' and id <= ' + str((i+1)*1000) + ';\n'

f.write(buffer)
f.close()