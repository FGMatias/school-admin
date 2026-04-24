import { type SeccionConSucursal } from '@/adapters/seccion.adapter'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  useCambiarEstadoSeccion,
  useCrearSeccion,
  useEditarSeccion,
  useSeccionesPorGrado,
} from '@/hooks/queries/useSeccion'
import { useSucursales } from '@/hooks/queries/useSucursal'
import { seccionSchema, type SeccionFormValues } from '@/schemas/seccion.schema'
import type { Grado } from '@/types/grado.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Info, Loader2, MoreVertical, Pencil, Plus, ShieldCheck, ShieldOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface GestionarSeccionesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  grado: Grado | null
}

export function GestionarSeccionesModal({
  open,
  onOpenChange,
  grado,
}: GestionarSeccionesModalProps) {
  const { data: sucursales = [] } = useSucursales()
  const { data: secciones = [], isLoading: cargandoSecciones } = useSeccionesPorGrado(
    grado?.id ?? null,
  )
  const crearSeccion = useCrearSeccion(grado?.id ?? 0)
  const editarSeccion = useEditarSeccion(grado?.id ?? 0)
  const cambiarEstado = useCambiarEstadoSeccion(grado?.id ?? 0)
  const [seccionEditando, setSeccionEditando] = useState<SeccionConSucursal | null>(null)
  const [filtroSucursal, setFiltroSucursal] = useState<string>('todas')

  const form = useForm<SeccionFormValues>({
    resolver: zodResolver(seccionSchema),
    defaultValues: {
      id_sucursal: undefined,
      nombre: '',
      capacidad: 0,
    },
  })

  useEffect(() => {
    if (seccionEditando) {
      form.reset({
        id_sucursal: seccionEditando.id_sucursal,
        nombre: seccionEditando.nombre,
        capacidad: seccionEditando.capacidad,
      })
    } else {
      form.reset({
        id_sucursal: undefined,
        nombre: '',
        capacidad: 0,
      })
    }
  }, [seccionEditando, form, open])

  const handleOpenChange = (nuevoEstado: boolean) => {
    if (!nuevoEstado) {
      setSeccionEditando(null)
      setFiltroSucursal('todas')
    }
    onOpenChange(nuevoEstado)
  }

  const isPending = crearSeccion.isPending || editarSeccion.isPending

  const onSubmit = (values: SeccionFormValues) => {
    if (seccionEditando) {
      editarSeccion.mutate(
        { id: seccionEditando.id, values },
        {
          onSuccess: () => {
            setSeccionEditando(null)
          },
        },
      )
    } else {
      crearSeccion.mutate(values, {
        onSuccess: () => {
          form.reset()
        },
      })
    }
  }

  const sucursalesActivas = sucursales.filter((s) => s.estado)

  const seccionesFiltradas = secciones.filter((s) => {
    if (filtroSucursal === 'todas') return true
    return s.id_sucursal.toString() === filtroSucursal
  })

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Gestionar Secciones - {grado?.nombre}</DialogTitle>
          <DialogDescription>Administra las secciones asignadas a este grado.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-xs font-bold tracking-wider text-muted-foreground uppercase">
              {seccionEditando ? 'Editar Sección' : 'Agregar Nueva Sección'}
            </h3>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col lg:flex-row gap-4 items-start lg:items-end"
              >
                <FormField
                  control={form.control}
                  name="id_sucursal"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-[260px] flex-none">
                      <FormLabel>Sucursal</FormLabel>
                      <Select
                        onValueChange={(val) => field.onChange(Number(val))}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar Sucursal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sucursalesActivas.map((sucursal) => (
                            <SelectItem key={sucursal.id} value={sucursal.id.toString()}>
                              {sucursal.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/3">
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Sección A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="capacidad"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/6">
                      <FormLabel>Capacidad</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="30"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex w-full lg:w-auto gap-2">
                  {seccionEditando && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setSeccionEditando(null)}
                      disabled={isPending}
                    >
                      Cancelar
                    </Button>
                  )}
                  <Button type="submit" disabled={isPending} className="w-full lg:w-auto">
                    {isPending ? (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : seccionEditando ? (
                      'Guardar'
                    ) : (
                      <>
                        <Plus className="mr-2 size-4" /> Agregar
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="size-4 text-blue-500" />
            <p>¿No encuentras la sucursal? Créala primero en la sección de Sucursal.</p>
          </div>

          <div className="space-y-4">
            <div className="w-64 flex-none">
              <Select value={filtroSucursal} onValueChange={setFiltroSucursal}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Todas las Sucursales" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las Sucursales</SelectItem>
                  {sucursales.map((sucursal) => (
                    <SelectItem key={sucursal.id} value={sucursal.id.toString()}>
                      {sucursal.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SUCURSAL</TableHead>
                    <TableHead>SECCIÓN</TableHead>
                    <TableHead>CAPACIDAD</TableHead>
                    <TableHead>ESTADO</TableHead>
                    <TableHead className="text-right">ACCIONES</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cargandoSecciones ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <Loader2 className="mx-auto size-6 animate-spin text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ) : seccionesFiltradas.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No se encontraron secciones registradas.
                      </TableCell>
                    </TableRow>
                  ) : (
                    seccionesFiltradas.map((seccion) => (
                      <TableRow key={seccion.id}>
                        <TableCell className="font-medium text-muted-foreground">
                          {seccion.sucursal?.nombre ?? '---'}
                        </TableCell>
                        <TableCell className="font-bold">{seccion.nombre}</TableCell>
                        <TableCell>{seccion.capacidad}</TableCell>
                        <TableCell>
                          <StatusBadge isActive={seccion.estado as boolean} />
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="size-8">
                                <MoreVertical className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSeccionEditando(seccion)}>
                                <Pencil className="mr-2 size-4" /> Editar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  cambiarEstado.mutate({ id: seccion.id, estado: !seccion.estado })
                                }
                              >
                                {seccion.estado ? (
                                  <>
                                    <ShieldOff className="mr-2 size-4 text-destructive" />{' '}
                                    Inhabilitar
                                  </>
                                ) : (
                                  <>
                                    <ShieldCheck className="mr-2 size-4" /> Habilitar
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <DialogFooter className="pt-4 border-t">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
