
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateOwnerSchema, type UpdateOwnerForm } from "../schemas/owner.schema"
import type { OwnerWithPatients } from "../schemas/owner.schema"

interface EditOwnerModalProps {
    owner: OwnerWithPatients | null
    isOpen: boolean
    onClose: () => void
    onUpdate: (ownerId: string, data: UpdateOwnerForm) => void
}

export function EditOwnerModal({ owner, isOpen, onClose, onUpdate }: EditOwnerModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UpdateOwnerForm>({
        resolver: zodResolver(updateOwnerSchema),
        defaultValues: owner
            ? {
                name: owner.name,
                document: owner.document,
                email: owner.email,
                telephone: owner.telephone,
                address: owner.address,
            }
            : undefined,
    })

    const onSubmit = async (data: UpdateOwnerForm) => {
        if (!owner) return

        setIsLoading(true)
        try {
            onUpdate(owner._id, data)

            onClose()
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    if (!owner) return null

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Editar Propietario</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input id="name" {...register("name")} placeholder="Ingresa el nombre completo" />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="document">Documento</Label>
                        <Input id="document" {...register("document")} placeholder="Número de documento" />
                        {errors.document && <p className="text-sm text-red-500">{errors.document.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email")} placeholder="correo@ejemplo.com" />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="telephone">Teléfono</Label>
                        <Input id="telephone" {...register("telephone")} placeholder="+57 300 123 4567" />
                        {errors.telephone && <p className="text-sm text-red-500">{errors.telephone.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Textarea id="address" {...register("address")} placeholder="Dirección completa" rows={3} />
                        {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Actualizando..." : "Actualizar Propietario"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
