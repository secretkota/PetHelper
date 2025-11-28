import * as Pet from "../model/petModel.js"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import multer from "multer"
import crypto from "crypto"
import asyncWrapper from "../middleware/asyncWrapper.js"
import { AppError } from "../errors/appError.js"
import * as PetError from '../errors/petError.js'
import { NotFoundError } from "../errors/NotFoundError.js"

const upload = multer({ storage: multer.memoryStorage() })
const s3 = new S3Client({
    region: process.env.AWS_REGION,
})



export const getCategory = asyncWrapper(async (req, res) => {
    const categories = await Pet.getCategories()
    if (!categories) throw new NotFoundError("Категории не найдено")
    res.json(categories)
})

export const getAll = asyncWrapper(async (req, res) => {
    const pets = await Pet.getAll(req.user.id)
    if (!pets) throw new NotFoundError("Питомцы не найдено")
    res.json(pets)
})

export const getByID = asyncWrapper(async (req, res) => {
    const petID = req.params.id;

    const pet = await Pet.getByID(petID)
    if (!pet) throw new NotFoundError("Питомец не найдено")
    res.json(pet)
})

export const create = [
    upload.single("image"),
    asyncWrapper(async (req, res) => {
        const { owner_id, name, type, breed, age, desc } = req.body

        if (!name) throw new PetError.InvalidError("Имя животного обязателено")
        if (!type) throw new PetError.InvalidError("Тип животного обязателен")
        if (age < 0) throw new PetError.InvalidError("Возраст не может быть отрицательным")


            let photo_path = "https://pethelper-bucket.s3.eu-north-1.amazonaws.com/pets/default.png"

            if (req.file) {
                const file = req.file
                const key = `pets/${crypto.randomUUID()}.jpeg`

                const command = new PutObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: key,
                    Body: file.buffer,
                    ContentType: file.mimetype
                })

                await s3.send(command);
                photo_path = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
            }

            const pet = await Pet.create({ owner_id, name, type, breed, age, photo_path, desc })

            if (!pet) throw new AppError("Ошибка при создании питомца", 500)


            res.status(201).json({
                message: "Питомец успешно создан",
                petId: pet.id,
                photo_path,
            })
    }),
]

export const update = [
    upload.single("image"),
    asyncWrapper(async (req, res) => {
        const petID = req.params.id
        const { name, type, breed, age, desc } = req.body

        if (!name) throw new PetError.InvalidError("Имя животного обязателено")
        if (!type) throw new PetError.InvalidError("Тип животного обязателен")
        if (age < 0) throw new PetError.InvalidError("Возраст не может быть отрицательным")

        try {
            let photo_path = "https://pethelper-bucket.s3.eu-north-1.amazonaws.com/pets/default.png"

            if (req.file) {
                const file = req.file;
                const key = `pets/${crypto.randomUUID()}.jpeg`

                const command = new PutObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: key,
                    Body: file.buffer,
                    ContentType: file.mimetype
                })

                await s3.send(command);
                photo_path = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
            } else {
                const existingPet = await Pet.getByID(petID)
                if (existingPet) photo_path = existingPet.photo_path
            }

            const result = await Pet.update(petID, { name, type, breed, age,  photo_path, desc })
            if (!result.updated) return res.status(404).json({ error: "Питомец не найден" })

            res.status(200).json({
                message: "Питомец успешно обновлен",
                petId: petID,
                photo_path,
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message })
        }
    }),
]


export const deletePet = asyncWrapper(async (req, res) => {
    const petID = req.params.id;

    const result = await Pet.remove(petID)

    if (!result.deleted) throw new NotFoundError("Питомец не найден")

    res.status(204)
})
