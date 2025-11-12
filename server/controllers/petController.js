import * as Pet from "../model/petModel.js"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import multer from "multer"
import crypto from "crypto"

const upload = multer({ storage: multer.memoryStorage() })
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})



export const getCategory = async (req, res) => {
    try {
        const categories = await Pet.getCategories()
        if (!categories) return res.status(404).json({ message: "Категории не найдены" })
        res.json(categories)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getAll = async (req, res) => {
    try {
        const pets = await Pet.getAll(req.user.id)
        if (!pets) return res.status(404).json({ message: "Питомцы не найдены" })
        res.json(pets)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getByID = async (req, res) => {
    const petID = req.params.id;

    try {
        const pet = await Pet.getByID(petID)
        if (!pet) return res.status(404).json({ message: "Питомец не найден" })
        res.json(pet)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const create = [
    upload.single("image"),
    async (req, res) => {
        const { owner_id, name, type, age, desc } = req.body

        if (!name) return res.status(400).json({ error: "Имя питомца обязательно" })
        if (!type) return res.status(400).json({ error: "Выберите тип питомца" })
        if (age < 0) return res.status(400).json({ error: "Возраст не может быть отрицательным" })

        try {
            let photo_path = null

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

            const pet = await Pet.create({ owner_id, name, type, age, photo_path, desc })

            if (!pet) return res.status(500).json({ error: "Ошибка при создании питомца" })


            res.status(201).json({
                message: "Питомец успешно создан",
                petId: pet.id,
                photo_path,
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message })
        }
    },
]

export const deletePet = (req, res) => {
    const petID = req.params.id;
    const userID = req.user.id;

    deletePet(petID, userID, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.changes === 0) return res.status(404).json({ error: "Питомец не найден" })
        res.json({ success: true })
    });
}
