import {PrismaClient} from '@prisma/client'
import {Roles} from "../src/users/users.dto";
import {AttestationType} from "../src/discipline/discipline.dto";

const prisma = new PrismaClient()
async function main() {
    const users = await prisma.users.createMany({
        data: [
            {
                login: 'admin',
                password: '123',
                role: Roles.ADMIN
            },
            {
                login: 'teacher',
                password: '123',
                role: Roles.TEACHER
            },
            {
                login: 'emp_dir',
                password: '123',
                role: Roles.DIRECTORATE_EMPLOYEE
            },
            {
                login: 'emp_edu',
                password: '123',
                role: Roles.EDUCATION_EMPLOYEE
            }
        ]
    });

    const disciplines = await prisma.disciplines.createMany({
        data: [
            {
                name: 'Математика',
                number_of_hours: 1,
                attestation_type: AttestationType.PASS
            },
            {
                name: 'Физика',
                number_of_hours: 2,
                attestation_type: AttestationType.EXAM
            },
            {
                name: 'Английский',
                number_of_hours: 3,
                attestation_type: AttestationType.PASS
            },
            {
                name: 'Русский',
                number_of_hours: 4,
                attestation_type: AttestationType.PASS
            },
            {
                name: 'Информатика',
                number_of_hours: 5,
                attestation_type: AttestationType.EXAM
            },
            {
                name: 'Базы данных',
                number_of_hours: 6,
                attestation_type: AttestationType.EXAM
            },
            {
                name: 'Основы программирования',
                number_of_hours: 7,
                attestation_type: AttestationType.EXAM
            },
            {
                name: 'Веб-программирование',
                number_of_hours: 8,
                attestation_type: AttestationType.EXAM
            }
        ]
    })

    const groups = await prisma.groups.createMany({
        data: [
            {
                group_number: 1,
                group_cipher: 'ИСТб',
                start_study_year: 20
            },
            {
                group_number: 1,
                group_cipher: 'АСУб',
                start_study_year: 23
            },
            {
                group_number: 1,
                group_cipher: 'ЭВМб',
                start_study_year: 21
            }
        ]
    });

    const students = await prisma.students.createMany({
        data: [
            {
                name: 'Иванов',
                surname: 'Иван',
                middle_name: 'Иванович',
                group_id: groups[Math.floor(Math.random() * groups.count)].id,
                gender: 'MALE',
                date_of_birth: '2000-01-01'
            },
            {
                name: 'Петров',
                surname: 'Петр',
                middle_name: 'Петрович',
                group_id: groups[Math.floor(Math.random() * groups.count)].id,
                gender: 'MALE',
                date_of_birth: '2000-01-01'
            },
            {
                name: 'Сидоров',
                surname: 'Сидор',
                middle_name: 'Сидорович',
                group_id: groups[Math.floor(Math.random() * groups.count)].id,
                gender: 'MALE',
                date_of_birth: '2000-01-01'
            }
        ]
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })