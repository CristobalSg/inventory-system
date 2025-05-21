
import {z, infer} from "zod"

export const createProductSchema = z.object({
    nombre: z.string(),
    stock: z.number(),
    valorCosto: z.number(),
    valorVenta: z.number(),
    unit: z.enum(["KG", "UNIT", "PACK"]),
    codigoBarras: z.string(),
    proveedorId: z.number()
})

export type CreateProductData = z.infer<typeof createProductSchema>
