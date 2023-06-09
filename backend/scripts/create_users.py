from faker import Faker
from random import choice

fake = Faker()

f = open('insert_users.sql', 'w')

genders = ["F", "M", "O"]
maritals = ["S", "M", "R"]
roles = ["Regular", "Moderator", "Admin"]

def insertUser(i):
    email = fake.email()
    username = "user" + str(i)
    password = "pbkdf2_sha256$390000$K5xVAgN90Uou1h0zhG741t$8j/0FuXtEKq7l10sr465eDGKnrD982I6Fmir8iGl8Rs="
    is_active=True
    role = choice(roles)
    time = "2023-05-10 02:41:47.490861+00:00"
    return f"(\'{email}\', \'{username}\', \'{password}\', {is_active}, \'{role}\', False, \'\', \'\', False, \'{time}\')"

def insertDetail(i):
    bio = fake.paragraph(nb_sentences=1)
    location = fake.city()
    birthday = fake.date()
    gender = choice(genders)
    marital = choice(maritals)
    return f"(\'{i}\', \'{bio}\', \'{location}\', \'{birthday}\', \'{gender}\', \'{marital}\', 12)"


# insertText = "INSERT INTO doctors_user(\"email\", \"username\", \"password\", \"is_active\", \"role\", \"is_superuser\", \"first_name\", \"last_name\", \"is_staff\", \"date_joined\") values "
#
# for i in range(10000 - 1):
#     insertText += insertUser(i) + ", "
# insertText += insertUser(9999) + ";\n"
#
# f.write(insertText)


insertText = "INSERT INTO doctors_userdetail(\"id\", \"bio\", \"location\", \"birthday\", \"gender\", \"marital\", \"paginationValue\") values "

for i in range(1,10001):
    insertText += insertDetail(i) + ", "

insertText = insertText[:-2] + ';'
f.write(insertText)

f.close()